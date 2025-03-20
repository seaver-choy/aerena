export const Back = ({ color }) => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 286 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path fill="url(#a-back)" d="m62 95 6 6h150l6-6H62Z" />
            <defs>
                <linearGradient
                    id="a-back"
                    x1={62}
                    x2={224}
                    y1={98}
                    y2={98}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor={color.light} />
                    <stop offset={1} stopColor={color.dark} />
                </linearGradient>
            </defs>
        </svg>
    );
};

export const BackWings = ({ color }) => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 286 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill="url(#a-back-wings)"
                d="m13 64 28-33s-4.5-3-9.5-14S26 2 26 2s-7.5 19.5-9 27 .75 12 1.5 18c.625 5-5.5 17-5.5 17Z"
            />
            <path
                fill="url(#b-back-wings)"
                d="m273 64-28-33s4.5-3 9.5-14S260 2 260 2s7.5 19.5 9 27-.75 12-1.5 18c-.625 5 5.5 17 5.5 17Z"
            />
            <defs>
                <linearGradient
                    id="a-back-wings"
                    x1={27}
                    x2={27}
                    y1={2}
                    y2={64}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor={color.dark} />
                    <stop offset={1} stopColor={color.light} />
                </linearGradient>
                <linearGradient
                    id="b-back-wings"
                    x1={259}
                    x2={259}
                    y1={2}
                    y2={64}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor={color.dark} />
                    <stop offset={1} stopColor={color.light} />
                </linearGradient>
            </defs>
        </svg>
    );
};

export const Base = ({ color }) => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 286 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill={color.main}
                d="M41 31h204l28 33-28 33h-85l-17 9-17-9H41L13 64l28-33Z"
            />
        </svg>
    );
};

export const Fangs = ({ color }) => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 286 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill={color.wings}
                d="m29.247 89 12.854 7s-3.955-4.5-.494-21.5C45.067 57.5 51 49 51 49s-10.382 3.5-18.292 17.5c-7.91 14-3.46 22.5-3.46 22.5ZM256.753 89l-12.854 7s3.955-4.5.494-21.5C240.933 57.5 235 49 235 49s10.382 3.5 18.292 17.5c7.91 14 3.461 22.5 3.461 22.5Z"
            />
        </svg>
    );
};

export const FangsAccent = ({ color }) => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 286 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill={color.accent}
                d="m42.101 96-4.45-2s-2.471-6 .495-18c3.75-13.271 11.941-25.644 12.784-26.896L51 49l-.07.104c-.678 1.016-6.084 9.482-9.323 25.396-3.46 17 .494 21.5.494 21.5ZM243.899 96l4.449-2s2.472-6-.494-18c-3.749-13.271-11.941-25.644-12.784-26.896L235 49l.07.104c.678 1.016 6.084 9.482 9.323 25.396 3.461 17-.494 21.5-.494 21.5Z"
            />
        </svg>
    );
};

export const FangsShadow = ({ color }) => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 286 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                filter="url(#a-fangs-shadow)"
                fill={color.accent}
                d="m29.247 89 12.854 7s-3.955-4.5-.494-21.5C45.067 57.5 51 49 51 49s-10.382 3.5-18.292 17.5c-7.91 14-3.46 22.5-3.46 22.5Z"
                opacity={0.3}
            />
            <path
                filter="url(#b-fangs-shadow)"
                fill={color.accent}
                d="m256.753 89-12.854 7s3.955-4.5.494-21.5C240.933 57.5 235 49 235 49s10.382 3.5 18.292 17.5c7.91 14 3.461 22.5 3.461 22.5Z"
                opacity={0.3}
            />
            <defs>
                <filter
                    id="a-fangs-shadow"
                    width={31}
                    height={55}
                    x={24}
                    y={45}
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                >
                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                    <feBlend
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feGaussianBlur
                        result="effect1_foregroundBlur_3383_26676"
                        stdDeviation={2}
                    />
                </filter>
                <filter
                    id="b-fangs-shadow"
                    width={31}
                    height={55}
                    x={231}
                    y={45}
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                >
                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                    <feBlend
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feGaussianBlur
                        result="effect1_foregroundBlur_3383_26676"
                        stdDeviation={2}
                    />
                </filter>
            </defs>
        </svg>
    );
};

export const FrontWings = ({ color }) => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 286 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill="url(#a-front-wings)"
                d="M5 25c1.722 2.547.852 7.633 9 11.897 13.427 7.028 2.632 22.818 6.5 32.824 2.32 6.004 10.13 8.306 15 14.438C41.768 92.049 47 106 47 106 36.268 98.552 9.704 76.784 7.102 73.064 4.122 68.804 8.204 63.396 9 56.641 9.796 49.886 2 43 2 43l3-18Z"
            />
            <path
                fill="url(#b-front-wings)"
                d="M281 25c-1.722 2.547-.852 7.633-9 11.897-13.427 7.028-2.632 22.818-6.5 32.824-2.321 6.004-10.129 8.306-15 14.438C244.232 92.049 239 106 239 106c10.732-7.448 37.296-29.216 39.898-32.936 2.981-4.26-1.102-9.668-1.898-16.423-.796-6.755 7-13.641 7-13.641l-3-18Z"
            />
            <defs>
                <linearGradient
                    id="a-front-wings"
                    x1={11.662}
                    x2={31.512}
                    y1={42.86}
                    y2={113.066}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor={color.light} />
                    <stop offset={0.704} stopColor={color.dark} />
                    <stop offset={1} stopColor={color.dark} />
                </linearGradient>
                <linearGradient
                    id="b-front-wings"
                    x1={274.338}
                    x2={254.488}
                    y1={42.86}
                    y2={113.066}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor={color.light} />
                    <stop offset={0.704} stopColor={color.dark} />
                    <stop offset={1} stopColor={color.dark} />
                </linearGradient>
            </defs>
        </svg>
    );
};

export const Knives = ({ color }) => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 286 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill="url(#a-knives)"
                d="M40 34c-9.325 4.602-25 18-25 18s8.5-17 22.5-26S55.228 14.194 67 12c12.31-2.294 20.5 3 34 2s36-12 36-12-.5 12.5-14.5 23S97 38 97 38s-.5-7-10-10.5c-9.385-3.458-14.282-2.779-23.172-1.546L63.5 26c-9.603 1.331-14.807 3.71-23.5 8Z"
            />
            <path
                fill="url(#b-knives)"
                d="M246 34c9.325 4.602 25 18 25 18s-8.5-17-22.5-26-17.728-11.806-29.5-14c-12.309-2.294-20.5 3-34 2S149 2 149 2s.5 12.5 14.5 23S189 38 189 38s.5-7 10-10.5c9.385-3.458 14.282-2.779 23.172-1.546l.328.046c9.603 1.331 14.807 3.71 23.5 8Z"
            />
            <defs>
                <linearGradient
                    id="a-knives"
                    x1={40.5}
                    x2={91.5}
                    y1={-16.5}
                    y2={60.5}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor={color.light} />
                    <stop offset={0.382} stopColor={color.light} />
                    <stop offset={0.713} stopColor={color.dark} />
                    <stop offset={1} stopColor={color.light} />
                </linearGradient>
                <linearGradient
                    id="b-knives"
                    x1={245.5}
                    x2={194.5}
                    y1={-16.5}
                    y2={60.5}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor={color.light} />
                    <stop offset={0.382} stopColor={color.light} />
                    <stop offset={0.713} stopColor={color.dark} />
                    <stop offset={1} stopColor={color.light} />
                </linearGradient>
            </defs>
        </svg>
    );
};

export const KnivesAccent = ({ color }) => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 286 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill={color.dark}
                d="M37.491 26c13.995-9 17.721-11.806 29.49-14 12.304-2.294 20.491 3 33.986 2 13.495-1 35.986-12 35.986-12s1.5 16-12.495 26.5S93.97 41 93.97 41s2.999-6-5.498-8-20.992 0-26.49 1.5C56.484 36 42.49 40 31.494 47.5 20.498 55 15 66 15 66V52s8.497-17 22.491-26ZM248.509 26c-13.995-9-17.721-11.806-29.489-14-12.305-2.294-20.492 3-33.987 2-13.495-1-35.986-12-35.986-12s-1.5 16 12.495 26.5S192.03 41 192.03 41s-2.999-6 5.498-8 20.992 0 26.49 1.5c5.498 1.5 19.493 5.5 30.488 13C265.502 55 271 66 271 66V52s-8.497-17-22.491-26Z"
            />
        </svg>
    );
};

export const Line = ({ color }) => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 286 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill="url(#a-line)"
                d="M125.751 89 143 98.132 160.248 89h72.266l12.322-17.25L231.586 85h-71.835L143 93.87 126.248 85H54.414l-13.25-13.25L53.484 89h72.266Z"
            />
            <defs>
                <linearGradient
                    id="a-line"
                    x1={55.5}
                    x2={238.719}
                    y1={89}
                    y2={89}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor={color.details} stopOpacity={0} />
                    <stop offset={0.484} stopColor={color.details} />
                    <stop
                        offset={1}
                        stopColor={color.details}
                        stopOpacity={0}
                    />
                </linearGradient>
            </defs>
        </svg>
    );
};

export const Logo = ({ color }) => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 286 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill={color.details}
                d="m148 30.6-3.1 1.4-1.6-6.8-.958 2.724 1.083-.445.493 2.095L138 32l2.459-7.026 2.091-1.524-1.699.403.461-1.317L140.7 22h4.2l3.1 8.6ZM147.522 28.096l-.722-2.003 1.2-.493-.478 2.496Z"
            />
        </svg>
    );
};

export const LogoAccent = ({ color }) => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 286 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill={color.accent}
                fillRule="evenodd"
                d="M128 20c8-1.37 11.8-4.26 15-7v1.59s-3.644 2.852-6.4 4.11a127.559 127.559 0 0 1-4.8 2.056s2.236 1.924 3.2 3.425c2.329 3.63.652 10.137.137 11.887L135 36s1.074-7.932-2-12c-.949-1.257-2.264-2.119-3.416-2.874-.596-.39-1.148-.753-1.584-1.126Zm30 0c-7.999-1.37-11.799-4.26-14.999-7H143v1.59c.042.033 3.659 2.86 6.4 4.11 2.355 1.076 4.8 2.056 4.8 2.056s-2.236 1.924-3.2 3.425c-2.329 3.63-.652 10.137-.137 11.887L151 36s-1.074-7.932 2-12c.949-1.257 2.264-2.119 3.416-2.874.596-.39 1.148-.753 1.584-1.126Z"
                clipRule="evenodd"
                opacity={0.3}
            />
        </svg>
    );
};

export const LogoBase = ({ color }) => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 286 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill={color.main}
                fillRule="evenodd"
                d="M143 13c-3.2 2.74-7 5.63-15 7 .436.373.988.735 1.584 1.126 1.152.755 2.466 1.617 3.416 2.874 3.074 4.068 2 12 2 12l8 4 8-4s-1.074-7.932 2-12c.949-1.257 2.264-2.119 3.416-2.874.596-.39 1.148-.753 1.584-1.126-8-1.37-11.8-4.26-15-7v27-27Z"
                clipRule="evenodd"
            />
        </svg>
    );
};

export const LogoOutline = ({ color }) => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 286 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill="url(#a-logo-outline)"
                fillRule="evenodd"
                d="M143 5c-4.267 4.567-15.04 14-24 14 2.56 1.096 5.613 2.432 8 5.182 4.168 4.8 3 14.818 3 14.818l13 6 13-6s-1.168-10.017 3-14.818c2.387-2.75 5.44-4.086 8-5.182-8.96 0-19.733-9.433-24-14Z"
                clipRule="evenodd"
            />
            <defs>
                <linearGradient
                    id="a-logo-outline"
                    x1={119}
                    x2={167}
                    y1={25}
                    y2={25}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor={color.light} />
                    <stop offset={1} stopColor={color.dark} />
                </linearGradient>
            </defs>
        </svg>
    );
};

export const MiddleWings = ({ color }) => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 286 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill="url(#a-middle-wings)"
                d="M24 67c-2.763-9.405 17-28 17-28s-11.211-6.89-16.018-12.257C18.374 19.364 12 6 12 6L7 26s7.69 11.504 5.595 27.252C10.5 69 13.859 72.536 13.859 72.536L47 106s-.949-10.247-5-19c-3.986-8.612-15.392-11.121-18-20Z"
            />
            <path
                fill="url(#b-middle-wings)"
                d="M262 67c2.763-9.405-17-28-17-28s11.211-6.89 16.018-12.257C267.626 19.364 274 6 274 6l5 20s-7.69 11.504-5.595 27.252c2.095 15.748-1.264 19.284-1.264 19.284L239 106s.948-10.247 5-19c3.986-8.612 15.392-11.121 18-20Z"
            />
            <defs>
                <linearGradient
                    id="a-middle-wings"
                    x1={12.5}
                    x2={42.5}
                    y1={15.5}
                    y2={106}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor={color.dark} />
                    <stop offset={0.488} stopColor={color.light} />
                    <stop offset={0.699} stopColor={color.dark} />
                </linearGradient>
                <linearGradient
                    id="b-middle-wings"
                    x1={273.5}
                    x2={243.5}
                    y1={15.5}
                    y2={106}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor={color.dark} />
                    <stop offset={0.488} stopColor={color.light} />
                    <stop offset={0.699} stopColor={color.dark} />
                </linearGradient>
            </defs>
        </svg>
    );
};
