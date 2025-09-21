import React, { useEffect, useRef } from 'react';

const StarsBackground = ({
    starDensity = 0.00015,
    allStarsTwinkle = true,
    twinkleProbability = 0.7,
    minTwinkleSpeed = 0.5,
    maxTwinkleSpeed = 1,
    className
}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const generateStars = (width, height) => {
            const area = width * height;
            const numStars = Math.floor(area * starDensity);
            const stars = [];

            for (let i = 0; i < numStars; i++) {
                const shouldTwinkle = allStarsTwinkle || Math.random() < twinkleProbability;
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 0.5 + 0.5,
                    opacity: Math.random() * 0.8 + 0.2,
                    twinkleSpeed: shouldTwinkle
                        ? (Math.random() * (maxTwinkleSpeed - minTwinkleSpeed) + minTwinkleSpeed) * 1000
                        : null,
                    twinklePhase: Math.random() * Math.PI * 2,
                });
            }

            return stars;
        };

        let stars = [];

        const render = (time) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

                let opacity = star.opacity;
                if (star.twinkleSpeed) {
                    const twinkle = Math.sin((time + star.twinklePhase) / star.twinkleSpeed) * 0.5 + 0.5;
                    opacity *= twinkle;
                }

                ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.fill();
            });

            animationId = requestAnimationFrame(render);
        };

        const init = () => {
            resizeCanvas();
            stars = generateStars(canvas.width, canvas.height);
            render(0);
        };

        init();

        const handleResize = () => {
            resizeCanvas();
            stars = generateStars(canvas.width, canvas.height);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, [starDensity, allStarsTwinkle, twinkleProbability, minTwinkleSpeed, maxTwinkleSpeed]);

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 pointer-events-none ${className || ''}`}
            style={{ zIndex: 0 }}
        />
    );
};

export default StarsBackground;
