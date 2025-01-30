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
