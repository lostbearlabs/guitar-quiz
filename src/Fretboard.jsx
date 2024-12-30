//import React from 'react';
import React, {useRef, useEffect} from 'react';

const Fretboard = ({played}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const margin = 20;  // Define a margin

        // Clear the canvas
        ctx.clearRect(0, 0, width, height);

        // Set background color
        ctx.fillStyle = '#8a5c28'; // Lighter sepia color
        ctx.fillRect(0, 0, width, height);

        // Set styles
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;

        const numberOfStrings = 6;
        const numberOfFrets = 14;

        const stringSpacing = height / (numberOfStrings + 1);
        const fretSpacing = (width - margin) / (numberOfFrets + 1);

        // Draw the strings
        for (let i = 1; i <= numberOfStrings; i++) {
            ctx.beginPath();
            ctx.moveTo(margin, i * stringSpacing);
            ctx.lineTo(width - fretSpacing/2, i * stringSpacing);
            ctx.stroke();
        }

        // Draw the frets
        for (let i = 0; i <= numberOfFrets; i++) {
            ctx.beginPath();
            ctx.lineWidth = i === 0 ? 4 : 2; // Make fret 0 line twice as thick
            ctx.moveTo(margin + i * fretSpacing, stringSpacing);
            ctx.lineTo(margin + i * fretSpacing, height - stringSpacing);
            ctx.stroke();
        }

        // Draw dots on the fretboard
        const dots = [3, 5, 7, 10, 12];
        ctx.fillStyle = 'grey';
        const dotRadius = 6;
        dots.forEach(fret => {
            const fretX = margin + fretSpacing * (fret - 0.5);
            const stringLowY = stringSpacing * 3;
            const stringHighY = stringSpacing * 4;
            const dotY = (stringLowY + stringHighY) / 2;

            ctx.beginPath();
            ctx.arc(fretX, dotY, dotRadius, 0, Math.PI * 2);
            ctx.fill();
        });

        // Draw the played notes
        ctx.fillStyle = 'black';
        const noteRadius = 8;
        const emptyRadius = 6;
        ctx.font = '16px Arial';
        played.forEach(([stringIndex, fret, color]) => {
            ctx.fillStyle = color
            const stringY = stringSpacing * (numberOfStrings - stringIndex);
            if (fret === 0) {
                // Draw an open circle for open strings
                ctx.beginPath();
                ctx.arc(margin - emptyRadius - 5, stringY, emptyRadius, 0, Math.PI * 2);
                ctx.stroke();
                // (But do fill in the circle if we're showing scale degrees with color)
                if (color !== 'black') {
                    ctx.fill();
                }
            } else if (fret > 0 && fret <= 14) {
                const fretX = margin + fretSpacing * (fret - 0.5);
                ctx.beginPath();
                ctx.arc(fretX, stringY, noteRadius, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillText('x', 5, stringY + 6); // Draw 'x' in the margin
            }
        });

    }, [played]);

    return (
        <div className="fretboard">
            <canvas ref={canvasRef} width={800} height={200}/>
        </div>
    );
};

export default Fretboard;

