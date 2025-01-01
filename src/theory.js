/**
 * The note values of each empty string, with the convention that
 * A=0, A#=1, ... G#=11
 */
let emptyStrings = [7, 0, 5, 10, 2, 7]

const NOTES_PER_OCTAVE = 12

/**
 * The degrees of the major scale.
 * (Do=0, Re=2, etc.)
 */
let degrees = [0, 2, 4, 5, 7, 9, 11]

/**
 * The colors of each scale degree.
 * (Do=Red, Re=Orange, etc.)
 */
let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple']

/**
 * The display names of each note, with the convention that
 * A=0, A#=1, ... G#=11
 */
export let noteNames = ['A', 'A\u266F/B\u266D', 'B', 'C', 'C\u266F/D\u266D', 'D', 'D\u266F/E\u266D', 'E', 'F', 'F\u266F/G\u266D', 'G', 'G\u266F/A\u266D']

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
    let triad = [
        [stringSet, x + offset, 'black'],
        [stringSet+1, y + offset, 'black'],
        [stringSet+2, z + offset, 'black'],
    ]

    // console.log("position=" + position + " inversion=" + inversion + " stringSet=" + stringSet + " triad=" + triad + "")
    return triad
}

export function getKey(position, inversion, stringSet) {
    let trad = triad(position, inversion, stringSet)

    let deltaString = 0
    if (inversion === 1 || inversion === 4) {
        deltaString = 2
    } else if (inversion === 2 || inversion === 5) {
        deltaString = 1
    }
    let string = stringSet + deltaString
    let key = (emptyStrings[string] + trad[deltaString][1]) % NOTES_PER_OCTAVE

    // console.log("trad=", trad)
    // console.log("position=" + position + " inversion=" + inversion + " stringSet=" + stringSet + " key=" + key + " trad=" + trad + " deltaString=" + deltaString + " string=" + string)

    return key
}

export function getNote(position, string) {
    return (emptyStrings[string] + position) % NOTES_PER_OCTAVE
}

export function singleNoteChord(position, string) {
    return [[string, position, 'black']]
}


export function showScaleDegrees(key, triadIndex) {
    let notes = []
    emptyStrings.forEach( (stringBase, stringIndex) => {
        for (let fret = 0; fret < 14; fret++) {
            let degree = (stringBase + fret - key + NOTES_PER_OCTAVE) % NOTES_PER_OCTAVE
            let degreeIndex = degrees.indexOf(degree)
            if (degreeIndex !== -1) {
                if (inTriad(degree, triadIndex)) {
                    notes.push([stringIndex, fret, colors[degreeIndex]])
                }
            }
        }
    })
    return notes
}

/**
 * Is the note with degreeIndex part of the given triad?
 * For triads, 0=all, 1=1/3/5, 2=2/4/6, etc.
 */
function inTriad(degree, triadIndex) {
    // console.log(degree, triadIndex)
    if (triadIndex===0) return true

    let triadNotes = [
        degrees[triadIndex-1 % degrees.length],
        degrees[(triadIndex+1) % degrees.length],
        degrees[(triadIndex+3) % degrees.length],
    ]

    return triadNotes.includes(degree)
}
