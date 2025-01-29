# external module
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
# system module
import sys

#index,Horizontal distance (m),Hypotenuse (m),Angle (°),Azimuth (°),Calculated hypotenuse,Calculated angle (°),Distance from L. Huron (m),Elevation (masl)
INDEX = "index"
H_DIST = "Horizontal distance (m)"
HYPO = "Hypotenuse (m)"
ANGLE = "Angle (°)"
AZIMUTH = "Azimuth (°)"
CALC_HYPO = "Calculated hypotenuse"
CALC_ANGLE = "Calculated angle (°)"
DISTANCE = "Distance from L. Huron (m)"
ELEVATION = "Elevation (masl)"


def parse_csv(filepath):
    try:
        df = pd.read_csv(filepath)
        return df
    except Exception as e:
        print(f"Error {e}")
        return None

def chart(data):
    # Start with the first point at origin (0,0)
    x = [0]
    y = [0]
    
    # Calculate cumulative x,y positions using distances and azimuths between points
    for i in range(1, len(data)):
        # Get distance between current and previous point
        distance = data[DISTANCE].iloc[i] - data[DISTANCE].iloc[i-1]
        # Get azimuth for this segment
        azimuth_rad = np.radians(data[AZIMUTH].iloc[i])
        
        # Calculate the change in x and y
        dx = distance * np.sin(azimuth_rad)
        dy = distance * np.cos(azimuth_rad)
        
        # Add new point by accumulating changes
        x.append(x[-1] + dx)
        y.append(y[-1] + dy)
    
    # Convert lists to numpy arrays for plotting
    x = np.array(x)
    y = np.array(y)
    z = data[ELEVATION]
    
    fig = plt.figure()
    ax = fig.add_subplot(111, projection='3d')
    ax.scatter(x, y, z)
    
    # Connect points with lines to show the path
    ax.plot(x, y, z)
    
    plt.title("Goderich River 3D Plot")
    plt.show()
'''
def chart(data):
    #plt.plot(data[DISTANCE], data[ELEVATION])
    #plt.xlabel("distance (m)")
    #plt.ylabel("elevation (masl)")
    #plt.title("goderich river very big")
    #plt.show()

    # Convert azimuth to radians
    azimuth_rad = np.radians(data[AZIMUTH])
    
    # Calculate x and y coordinates from distance and azimuth
    x = data[DISTANCE] * np.sin(azimuth_rad)  # East-West
    y = data[DISTANCE] * np.cos(azimuth_rad)  # North-South
    z = data[ELEVATION]  # Height
    
    fig = plt.figure()
    ax = fig.add_subplot(111, projection='3d')
    ax.scatter(x, y, z)
    
    #ax.set_xlabel('East-West (m)')
    #ax.set_ylabel('North-South (m)')
    #ax.set_zlabel('Elevation (masl)')
    plt.title("Goderich River 3D Plot")
    plt.show()
'''


def main():
    filepath = sys.argv[1]
    data = parse_csv(filepath)
    if data is not None:
        #print(data.to_string())
        #print(data.columns)
        chart(data)

if __name__ == "__main__":
    main()

