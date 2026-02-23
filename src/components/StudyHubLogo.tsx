
interface LogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export default function StudyHubLogo({ className = '', size = 'md' }: LogoProps) {
    const sizes = {
        sm: { width: 180, height: 40 },
        md: { width: 300, height: 64 },
        lg: { width: 440, height: 92 },
    };

    const { width, height } = sizes[size];
    const scale = height / 92; // base scale

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 440 92"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            role="img"
            aria-label="Study Hub"
        >
            {/* "Study" text — white bold */}
            <text
                x="8"
                y="72"
                fontFamily="'Arial Black', 'Helvetica Neue', Arial, sans-serif"
                fontWeight="900"
                fontSize="72"
                fill="#FFFFFF"
                letterSpacing="-1"
            >
                Study
            </text>

            {/* Purple rounded rectangle behind "Hub" */}
            <rect
                x="268"
                y="8"
                width="164"
                height="76"
                rx="12"
                ry="12"
                fill="#7c6af7"
            />

            {/* "Hub" text — dark on purple */}
            <text
                x="286"
                y="72"
                fontFamily="'Arial Black', 'Helvetica Neue', Arial, sans-serif"
                fontWeight="900"
                fontSize="72"
                fill="#0f0f13"
                letterSpacing="-1"
            >
                Hub
            </text>
        </svg>
    );
}
