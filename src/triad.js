const rotateRight = (arr, places) => {
    const len = arr.length;
    const offset = places % len;
    return [...arr.slice(len - offset), ...arr.slice(0, len - offset)];
};

/**
 * The note values of each empty string, with the convention that
 * A=0, A#=1, ... G#=11
 */
let emptyStrings = [7, 0, 5, 10, 2, 7]
const NOTES_PER_OCTAVE = 12

export function triad(position, inversion, stringSet) {

    let x = position
    let y
    let z

    // Set the major triad shape based on the inversion chosen
    let shape = inversion % 3
    if (shape === 0) {
        // Root position, C shape, 1/3/5
        y = x - 1
        z = y - 2
    } else if (shape === 1) {
        // First inversion, G shape, 3/5/1
        y = x - 2
        z = y
    } else if (shape === 2) {
        // Second inversion, E shape, 5/1/3
        // noinspection JSSuspiciousNameCombination
        y = x
        z = y - 1
    }

    // Inversion values 3-5 indicate minor triads, so drop
    // the appropriate string.
    if (inversion === 3) {
        // minor Root position, C shape, 1/b3/5
        y--
    } else if (inversion === 4) {
        // minor First inversion, G shape, b3/5/1
        x--
    } else if (inversion === 5) {
        // minor Second inversion, E shape, 5/1/b3
        z--
    }

    // For stringSet 2 or 3, mutate the triad shape as it
    // crosses the b string.
    if (stringSet === 2) {
        z += 1
    }
    if (stringSet === 3) {
        y += 1
        z += 1
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
    let trad = triad(position, inversion, stringSet)

    let deltaString = 0
    if (inversion === 1 || inversion === 4) {
        deltaString = 2
    } else if (inversion === 2 || inversion === 5) {
        deltaString = 1
    }
    let string = stringSet + deltaString
    let key = (emptyStrings[string] + trad[string]) % NOTES_PER_OCTAVE

    // console.log("position=" + position + " inversion=" + inversion + " stringSet=" + stringSet + " key=" + key + " trad=" + trad + " deltaString=" + deltaString + " string=" + string)

    return key
}

export function getNote(position, string) {
    return (emptyStrings[string] + position) % NOTES_PER_OCTAVE
}

export function singleNoteChord(position, string) {
    let chord = [-1, -1, -1, -1, -1, -1]
    chord[string] = position
    return chord
}
