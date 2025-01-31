function calculateVectorsAndPoints(data) {
    let vectors = [];
    let points = [];
    let x = [0];
    let y = [0];
    let z = [0];

    for(let i = 1; i < data.length; i++) {
        let distance = data[i][1] - data[i-1][1];
        let azimuthRad = (data[i][0] * Math.PI) / 180;

        let dx = distance * Math.sin(azimuthRad);
        let dy = distance * Math.cos(azimuthRad);

        x.push(x[x.length - 1] + dx);
        y.push(y[y.length - 1] + dy);
        z.push((data[i][2] - 176));
    }

    for(let i = 0; i < data.length; i++) {
        const vector = new THREE.Vector3(x[i], y[i], z[i]); 
        vectors.push(vector);

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', 
            new THREE.Float32BufferAttribute([vector.x, vector.y, vector.z], 3));
        
        const material = new THREE.PointsMaterial({ 
            color: 0xffffff,
            size: 10, 
        });
        
        const point = new THREE.Points(geometry, material);
        points.push(point);
    }

    return { vectors, points };
}


function renderLine(vectors) {
    let mat = new THREE.LineBasicMaterial({color: 0x164fde,});
    const geo = new THREE.BufferGeometry().setFromPoints(vectors);
    const line = new THREE.Line(geo, mat);
    scene.add(line);
}
async function renderIco(x, y, z) {
    //console.log(x, y, z);
    let geo = new THREE.IcosahedronGeometry(4, 2);
    let mat = new THREE.MeshBasicMaterial({ color: 0x164fde, });
    const point = new THREE.Mesh(geo, mat);
    point.position.set(x, y, z);
    scene.add(point);
}
function calcCurve(vectors) {
    return new THREE.CatmullRomCurve3(vectors);
}
function calcEvenlySpacedPoints(curve, n) {
    const points = [];
    const length = curve.getLength();
    const segmentLength = length / (n - 1);
    for(let i = 0; i < n; i++) {
        const point = curve.getPointAt(curve.getUtoTmapping(i * segmentLength / length));
        points.push(point);
    }
    return points;
}
// flow animation, flow rate
function animateFlow2(points) {
    let p = points.length - 4;
    
    const getLoopedIndex = (index) => {
        return ((index % points.length) + points.length) % points.length;
    };
    
    const updateColors = () => {
        const i1 = getLoopedIndex(p-8);
        const i2 = getLoopedIndex(p-7);
        const i3 = getLoopedIndex(p-6);
        const i4 = getLoopedIndex(p-5);
        const i5 = getLoopedIndex(p-4);
        const i6 = getLoopedIndex(p-3);
        const i7 = getLoopedIndex(p-2);
        const i8 = getLoopedIndex(p-1);
        const mid = getLoopedIndex(p); // middle
        const i9 = getLoopedIndex(p+1);
        const i10 = getLoopedIndex(p+2);
        const i11 = getLoopedIndex(p+3);
        const i12 = getLoopedIndex(p+4);
        const i13 = getLoopedIndex(p+5);
        const i14 = getLoopedIndex(p+6);
        const i15 = getLoopedIndex(p+7);
        const i16 = getLoopedIndex(p+8);
        
        points[i1].material.color.setHex(0x8da9f0);
        points[i2].material.color.setHex(0x5983f0);
        points[i3].material.color.setHex(0x5983f0);
        points[i4].material.color.setHex(0x3566e6);
        points[i5].material.color.setHex(0x3566e6);
        points[i6].material.color.setHex(0x164fde);
        points[i7].material.color.setHex(0x164fde);
        points[i8].material.color.setHex(0x164fde);
        points[mid].material.color.setHex(0x164fde); // middle
        points[i9].material.color.setHex(0x164fde);
        points[i10].material.color.setHex(0x164fde);
        points[i11].material.color.setHex(0x164fde);
        points[i12].material.color.setHex(0x3566e6);
        points[i13].material.color.setHex(0x3566e6);
        points[i14].material.color.setHex(0x5983f0);
        points[i15].material.color.setHex(0x5983f0);
        points[i16].material.color.setHex(0x8da9f0);
        
        p = getLoopedIndex(p - 1);
    }
    
    setInterval(updateColors, 15);
}
