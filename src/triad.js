const rotateRight = (arr, places) => {
    const len = arr.length;
    const offset = places % len;
    return [...arr.slice(len - offset), ...arr.slice(0, len - offset)];
};

export function triad(position, inversion, stringSet) {

    let x = position
    let y
    let z

    if (inversion === 0) {
        // Root position, C shape, 1/3/5
        y = x - 1
        z = y - 2
    } else if (inversion === 1) {
        // First inversion, G shape, 3/5/1
        y = x - 2
        z = y
    } else {
        // Second inversion, E shape, 5/1/3
        // noinspection JSSuspiciousNameCombination
        y = x
        z = y - 1
    }

    if (stringSet === 2) {
        z += 1
    }
    if (stringSet === 3) {
        y += 1
    }

    let minPos = Math.min(x, y, z)
    let offset = position - minPos
    let triad = [x + offset, y + offset, z + offset, -1, -1, -1]

    triad = rotateRight(triad, stringSet);
    // console.log("position=" + position + " inversion=" + inversion + " stringSet=" + stringSet + " triad=" + triad + "")
    return triad
}

//                 {['A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab'].map((label, idx) => (
export function getKey(position, inversion, stringSet) {
    let emptyStrings = [7, 0, 5, 10, 2, 7]
    let trad = triad(position, inversion, stringSet)

    let deltaString = 0
    if (inversion === 1) {
        deltaString = 2
    } else if (inversion === 2) {
        deltaString = 1
    }
    let string = stringSet + deltaString
    let key = (emptyStrings[string] + trad[string]) % 12

    // console.log("position=" + position + " inversion=" + inversion + " stringSet=" + stringSet + " key=" + key + " trad=" + trad + " deltaString=" + deltaString + " string=" + string)

    return key
}
