import React, { useEffect, useRef } from 'react';

const ShootingStars = ({
    minSpeed = 10,
    maxSpeed = 30,
    minDelay = 1200,
    maxDelay = 4200,
    starColor = "#9E00FF",
    trailColor = "#2EB9DF",
    starWidth = 10,
    starHeight = 1,
    className
}) => {
    const svgRef = useRef(null);

    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;

        const createShootingStar = () => {
            const rect = svg.getBoundingClientRect();
            const startX = Math.random() * rect.width;
            const startY = Math.random() * rect.height;
            const angle = Math.random() * Math.PI / 2 + Math.PI / 4; // 45-135 degrees

            const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
            const distance = Math.max(rect.width, rect.height) * 1.5;

            const endX = startX + Math.cos(angle) * distance;
            const endY = startY + Math.sin(angle) * distance;

            const star = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            star.setAttribute('x1', startX.toString());
            star.setAttribute('y1', startY.toString());
            star.setAttribute('x2', startX.toString());
            star.setAttribute('y2', startY.toString());
            star.setAttribute('stroke', `url(#gradient-${Date.now()})`);
            star.setAttribute('stroke-width', starHeight.toString());
            star.setAttribute('stroke-linecap', 'round');

            const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            const gradientId = `gradient-${Date.now()}`;
            gradient.setAttribute('id', gradientId);
            gradient.setAttribute('gradientUnits', 'userSpaceOnUse');
            gradient.setAttribute('x1', startX.toString());
            gradient.setAttribute('y1', startY.toString());
            gradient.setAttribute('x2', endX.toString());
            gradient.setAttribute('y2', endY.toString());

            const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop1.setAttribute('offset', '0%');
            stop1.setAttribute('style', `stop-color:${trailColor};stop-opacity:0`);

            const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop2.setAttribute('offset', '100%');
            stop2.setAttribute('style', `stop-color:${starColor};stop-opacity:1`);

            gradient.appendChild(stop1);
            gradient.appendChild(stop2);

            const defs = svg.querySelector('defs') || svg.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'defs'));
            defs.appendChild(gradient);
            svg.appendChild(star);

            // Animate the shooting star
            const duration = (distance / speed) * 16; // Convert to roughly 60fps equivalent
            star.animate(
                [
                    {
                        x2: startX.toString(),
                        y2: startY.toString(),
                        opacity: 0
                    },
                    {
                        x2: (startX + Math.cos(angle) * starWidth).toString(),
                        y2: (startY + Math.sin(angle) * starWidth).toString(),
                        opacity: 1
                    },
                    {
                        x2: endX.toString(),
                        y2: endY.toString(),
                        opacity: 0
                    }
                ],
                {
                    duration: duration,
                    easing: 'linear',
                }
            ).onfinish = () => {
                svg.removeChild(star);
                defs.removeChild(gradient);
            };
        };

        const scheduleNextStar = () => {
            const delay = Math.random() * (maxDelay - minDelay) + minDelay;
            setTimeout(() => {
                createShootingStar();
                scheduleNextStar();
            }, delay);
        };

        scheduleNextStar();
    }, [minSpeed, maxSpeed, minDelay, maxDelay, starColor, trailColor, starWidth, starHeight]);

    return (
        <svg
            ref={svgRef}
            className={`fixed inset-0 pointer-events-none ${className || ''}`}
            style={{ zIndex: 1 }}
        >
            <defs></defs>
        </svg>
    );
};

export default ShootingStars;
