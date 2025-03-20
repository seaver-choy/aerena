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

export const BackWingsShine = () => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 286 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill="#fff"
                d="M29 20c1.521 2.644 5 6 5 6s-2.643-4.16-4-7c-2.05-4.29-3.075-9.716-4-11.5 0 0 .496 8.149 3 12.5ZM257 20c-1.521 2.644-5 6-5 6s2.643-4.16 4-7c2.05-4.29 3.075-9.716 4-11.5 0 0-.496 8.149-3 12.5Z"
                opacity={0.3}
            />
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

export const BaseDarken = () => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 286 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill="#000"
                d="M143 31h102l28 33-28 33h-85l-17 9V31Z"
                opacity={0.5}
            />
        </svg>
    );
};

export const BaseShadow = () => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 286 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                filter="url(#a-base-shadow)"
                fill="#5C5C5C"
                d="M41 31h204l28 33-28 33H41L13 64l28-33Z"
            />
            <defs>
                <filter
                    id="a-base-shadow"
                    width={276.2}
                    height={82.2}
                    x={4.9}
                    y={22.9}
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
                        result="effect1_foregroundBlur_3383_26243"
                        stdDeviation={4.05}
                    />
                </filter>
            </defs>
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

export const FrontWingsShadow = () => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 286 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                filter="url(#a-front-wings-shadow)"
                fill="#212121"
                d="M9 23c1.722 2.547.852 7.633 9 11.897 13.427 7.028 2.632 22.818 6.5 32.824 2.32 6.004 10.13 8.306 15 14.438C45.768 90.049 51 104 51 104c-10.732-7.448-37.296-29.216-39.898-32.936-2.98-4.26 1.102-9.668 1.898-16.423C13.796 47.886 6 41 6 41l3-18Z"
                opacity={0.3}
            />
            <path
                filter="url(#b-front-wings-shadow)"
                fill="#212121"
                d="M281 23c-1.722 2.547-.852 7.633-9 11.897-13.427 7.028-2.632 22.818-6.5 32.824-2.321 6.004-10.129 8.306-15 14.438C244.232 90.049 239 104 239 104c10.732-7.448 37.296-29.216 39.898-32.936 2.981-4.26-1.102-9.668-1.898-16.423-.796-6.755 7-13.641 7-13.641l-3-18Z"
                opacity={0.3}
            />
            <defs>
                <filter
                    id="a-front-wings-shadow"
                    width={56.2}
                    height={92.2}
                    x={0.4}
                    y={17.4}
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
                        result="effect1_foregroundBlur_3383_26718"
                        stdDeviation={2.8}
                    />
                </filter>
                <filter
                    id="b-front-wings-shadow"
                    width={56.2}
                    height={92.2}
                    x={233.4}
                    y={17.4}
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
                        result="effect1_foregroundBlur_3383_26718"
                        stdDeviation={2.8}
                    />
                </filter>
            </defs>
        </svg>
    );
};

export const FrontWingsShine = () => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 286 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill="#fff"
                d="m20 82 17 14-1-2-16-12ZM16.825 41.913c-1.249-1.559-4.388-2.626-4.388-2.626S14.306 43.256 15 44.5c.821 1.475 2.825 4.913 2.825 4.913s.846-5.193-1-7.5ZM266 82l-17 14 1-2 16-12ZM269.176 41.913c1.248-1.559 4.387-2.626 4.387-2.626s-1.87 3.969-2.563 5.213a436.884 436.884 0 0 1-2.824 4.913s-.847-5.193 1-7.5Z"
                opacity={0.3}
            />
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

export const KnivesShadow = () => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 286 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                filter="url(#a-knives-shadow)"
                fill="#F5F1EE"
                d="M37.491 28c13.995-9 17.721-11.806 29.49-14 12.304-2.294 20.491 3 33.986 2 13.495-1 35.986-12 35.986-12s1.5 16-12.495 26.5S93.97 43 93.97 43s2.999-6-5.498-8-20.992 0-26.49 1.5C56.484 38 42.49 42 31.494 49.5 20.498 57 15 68 15 68V54s8.497-17 22.491-26Z"
                opacity={0.3}
            />
            <path
                filter="url(#b-knives-shadow)"
                fill="#F5F1EE"
                d="M248.509 28c-13.995-9-17.721-11.806-29.489-14-12.305-2.294-20.492 3-33.987 2-13.495-1-35.986-12-35.986-12s-1.5 16 12.495 26.5S192.03 43 192.03 43s-2.999-6 5.498-8 20.992 0 26.49 1.5c5.498 1.5 19.493 5.5 30.488 13C265.502 57 271 68 271 68V54s-8.497-17-22.491-26Z"
                opacity={0.3}
            />
            <defs>
                <filter
                    id="a-knives-shadow"
                    width={130}
                    height={72}
                    x={11}
                    y={0}
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
                        result="effect1_foregroundBlur_3383_26694"
                        stdDeviation={2}
                    />
                </filter>
                <filter
                    id="b-knives-shadow"
                    width={130}
                    height={72}
                    x={145}
                    y={0}
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
                        result="effect1_foregroundBlur_3383_26694"
                        stdDeviation={2}
                    />
                </filter>
            </defs>
        </svg>
    );
};

export const KnivesShine = () => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 286 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill="#fff"
                d="M67.879 14.094C62.476 14.723 55 19.397 55 19.397l25-3.788s-7.383-2.067-12.121-1.515ZM218.121 14.094c5.403.629 12.879 5.303 12.879 5.303l-25-3.788s7.383-2.067 12.121-1.515Z"
                opacity={0.3}
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

export const LogoDarken = () => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 286 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill="#000"
                d="M143 5v40l13-6s-1.168-10.017 3-14.818c2.387-2.75 5.44-4.086 8-5.182-8.96 0-19.733-9.433-24-14Z"
                opacity={0.5}
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

export const LogoShadow = () => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 286 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                filter="url(#a-logo-shadow)"
                fill="#212121"
                fillRule="evenodd"
                d="M143 5c-4.267 4.567-15.04 14-24 14 2.56 1.096 5.613 2.432 8 5.182 4.168 4.8 3 14.818 3 14.818l13 6 13-6s-1.168-10.017 3-14.818c2.387-2.75 5.44-4.086 8-5.182-8.96 0-19.733-9.433-24-14Z"
                clipRule="evenodd"
                opacity={0.3}
            />
            <defs>
                <filter
                    id="a-logo-shadow"
                    width={56}
                    height={48}
                    x={115}
                    y={1}
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
                        result="effect1_foregroundBlur_3383_26740"
                        stdDeviation={2}
                    />
                </filter>
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

export const MiddleWingsShadow = () => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 286 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                filter="url(#a-middle-wings-shadow)"
                fill="#F5F1EE"
                d="M25 67c-2.763-9.405 17-28 17-28s-11.211-6.89-16.018-12.257C19.374 19.364 13 6 13 6L8 26s7.69 11.504 5.595 27.252C11.5 69 14.859 72.536 14.859 72.536L48 106s-.949-10.247-5-19c-3.986-8.612-15.392-11.121-18-20Z"
                opacity={0.3}
            />
            <path
                filter="url(#b-middle-wings-shadow)"
                fill="#F5F1EE"
                d="M261 67c2.763-9.405-17-28-17-28s11.211-6.89 16.018-12.257C266.626 19.364 273 6 273 6l5 20s-7.69 11.504-5.595 27.252c2.095 15.748-1.264 19.284-1.264 19.284L238 106s.948-10.247 5-19c3.986-8.612 15.392-11.121 18-20Z"
                opacity={0.3}
            />
            <defs>
                <filter
                    id="a-middle-wings-shadow"
                    width={50}
                    height={110}
                    x={3}
                    y={1}
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
                        result="effect1_foregroundBlur_3383_26658"
                        stdDeviation={2.5}
                    />
                </filter>
                <filter
                    id="b-middle-wings-shadow"
                    width={50}
                    height={110}
                    x={233}
                    y={1}
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
                        result="effect1_foregroundBlur_3383_26658"
                        stdDeviation={2.5}
                    />
                </filter>
            </defs>
        </svg>
    );
};

export const MiddleWingsShine = () => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 286 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill="#fff"
                d="M15.5 18.5c1.483 2.495 5 5.5 5 5.5L17 18.5 13 11s.922 4.846 2.5 7.5ZM270.5 18.5c-1.483 2.495-5 5.5-5 5.5l3.5-5.5 4-7.5s-.923 4.846-2.5 7.5Z"
                opacity={0.3}
            />
        </svg>
    );
};

export const Team = ({ color, team }) => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 286 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <text
                xmlSpace="preserve"
                fill={color.details}
                fontFamily="Russo One"
                fontSize={32}
                letterSpacing="0em"
                style={{
                    whiteSpace: "pre",
                }}
            >
                <tspan x={143.6} y={76} textAnchor="middle">
                    {team}
                </tspan>
            </text>
        </svg>
    );
};

export const Wave = () => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 286 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill="url(#a-wave)"
                fillRule="evenodd"
                d="M33.058 57.926c-.563 2.676-2.114 5.23-4.06 7.724l.002-.002c-.322.413-.633.828-.945 1.242-.575.765-1.15 1.53-1.787 2.28-1.367 1.612-3.194 2.957-5.44 4.056l-1.596-1.881c1.312-.82 2.393-1.763 3.211-2.834a67.98 67.98 0 0 0 5.38-8.269c1.354-2.443 2.04-4.968 2.261-7.52.224-2.57.58-5.138.951-7.704l.041-.288c.121-.846.242-1.695.428-2.538l8.005-9.434L42.149 31h3.724a435.49 435.49 0 0 0-2.138 1.627l-.2.152c-1.724 1.32-3.453 2.642-4.956 4.026-2.677 2.466-3.566 5.179-3.82 7.962-.223 2.454-.462 4.907-.77 7.358-.245 1.936-.525 3.871-.931 5.8ZM48.444 31a270.33 270.33 0 0 0-2.93 2.395l-.471.389c-2.297 1.896-4.587 3.787-5.902 5.936-.957 1.56-1.504 3.16-1.64 4.793-.128 1.548-.252 3.097-.375 4.645-.155 1.936-.31 3.872-.473 5.808-.486 5.74-3.89 11.049-9.313 16.045-1.481 1.364-3.332 2.49-5.494 3.414l.813.959c3.417-1.355 6.154-3.123 8.279-5.269v.002c2.397-2.42 4.782-4.843 6.207-7.469 1.178-2.171 1.61-4.405 1.905-6.64.173-1.312.25-2.627.325-3.941.047-.81.094-1.621.164-2.43.035-.41.067-.82.1-1.23v-.001c.125-1.597.251-3.195.53-4.785.468-2.683 2.152-5.198 4.808-7.523.764-.67 1.523-1.341 2.282-2.013 1.164-1.03 2.33-2.061 3.514-3.085h-2.33Zm1.681 3.724c-.625.651-1.25 1.303-1.885 1.95-2.232 2.276-3.831 4.667-4.285 7.208-.403 2.262-.644 4.535-.85 6.806-.105 1.15-.166 2.3-.227 3.45v.001c-.071 1.322-.142 2.645-.277 3.966-.191 1.89-.636 3.772-1.85 5.58-2.346 3.493-6 6.634-10.199 9.616-1.918 1.363-4.184 2.493-6.776 3.4L24.88 78c2.624-.852 4.946-1.913 6.986-3.156 4.346-2.648 8.286-5.443 11.38-8.524 2.033-2.02 3.17-4.159 3.54-6.43.264-1.628.283-3.258.302-4.886.013-1.111.025-2.222.116-3.33.039-.47.072-.939.106-1.408v-.002c.219-3.062.438-6.132 1.988-9.128 1.332-2.577 3.399-5.012 5.467-7.448l.001-.002.745-.878A33.412 33.412 0 0 1 57.156 31h-3.36c-1.275 1.226-2.473 2.475-3.67 3.724Zm166.741 13.92c4.555-3.585 7.279-7.538 8.648-11.727h-.006A98.016 98.016 0 0 1 227.643 31H245l28 33-28 33h-14.337c2.542-3.315 6.409-7.075 12.271-11.045-3.993.992-7.756 2.21-11.201 3.715-1.206.527-2.395 1.065-3.585 1.603-2.775 1.256-5.55 2.512-8.535 3.622-1.897.706-3.801 1.407-5.71 2.105h-10.047c.444-.193.852-.409 1.259-.624.214-.113.428-.226.647-.336l-.221-.184c-.177.027-.359.049-.541.071-.395.048-.789.097-1.134.192-.685.19-1.373.376-2.062.563-.391.105-.783.211-1.173.318h-6.85c1.54-.61 3.076-1.225 4.608-1.841h.003c9.791-3.94 20.258-7.394 31.23-10.42 7.588-2.092 15.458-3.858 23.818-4.97a33.484 33.484 0 0 0 3.374-2.256c-2.582.446-5.167.887-7.794 1.255-8.913 1.25-17.102 3.328-24.969 5.71-8.557 2.59-16.443 5.69-24.213 8.847-1.469.597-2.933 1.197-4.396 1.796-1.532.628-3.063 1.255-4.6 1.879h-1.605c2.852-1.152 5.683-2.317 8.515-3.482 5.288-2.176 10.578-4.352 16.005-6.442l.003.001c8.085-3.114 16.819-5.638 26.138-7.618 3.268-.695 6.648-1.254 10.03-1.813h.001c1.874-.31 3.748-.62 5.604-.954l.732-.13c.734-.132 1.468-.263 2.201-.396.427-.374.854-.772 1.275-1.192l-.768.153-1.301.256-.006.002h-.006l-.006.002c-3.978.786-7.966 1.575-12.052 2.185-8.987 1.341-17.191 3.498-24.893 6.116-8.787 2.987-17.037 6.359-25.032 9.87A245.681 245.681 0 0 1 187.431 97h-2.217l.016-.006c4.469-1.758 8.803-3.605 13.138-5.452h.002l.001-.001c3.035-1.293 6.07-2.586 9.152-3.85l.748-.306c5.96-2.445 11.93-4.893 18.724-6.749.84-.23 1.676-.464 2.511-.699h.004v-.001c3.512-.987 7.022-1.973 10.903-2.572l1.463-.223h.001c1.831-.276 3.665-.554 5.45-.891 4.131-.782 8.227-1.617 12.32-2.453h-.003c.501-.103.992-.214 1.478-.329.989-1.174 1.882-2.48 2.562-3.916a35.493 35.493 0 0 1-4.499.88c-7.621.996-15.332 1.681-23.183 1.979-4.375.166-8.394.828-11.76 2.336a43.343 43.343 0 0 1-3.295 1.34c-1.558.55-3.131 1.088-4.704 1.627h-.003l-.001.001h-.001l-.001.001h-.002l-.002.001c-1.923.659-3.847 1.317-5.742 1.996-2.323.832-4.627 1.677-6.932 2.522h-.002l-.001.001h-.001l-.002.001h-.001l-.001.001h-.001l-.002.001h-.001c-3 1.1-5.999 2.2-9.039 3.27-3.448 1.215-7.105 2.27-11.242 2.769-1.051.127-2.196.125-3.283.084-.845-.032-1.266-.395-1.013-.805.262-.42.61-.857 1.146-1.195 1.23-.774 2.5-1.548 3.925-2.227a2467.99 2467.99 0 0 1 12.281-5.796c2.361-1.11 4.722-2.218 7.079-3.33.586-.277 1.19-.548 1.795-.818h.002v-.001h.001c1.566-.7 3.134-1.403 4.4-2.223 3.598-2.336 6.292-4.985 8.651-7.683 2.506-2.868 5.377-5.599 9.611-7.885 7.517-4.059 13.035-8.801 18.409-13.588a67.971 67.971 0 0 1-2.161-1.342c-.704.67-1.47 1.33-2.303 1.976a50.052 50.052 0 0 0-4.608 4.059c-2.98 2.964-6.634 5.684-10.892 8.207-2.862 1.697-5.553 3.483-7.308 5.532-2.341 2.729-5.386 5.235-8.56 7.716-1.693 1.325-3.733 2.478-6.224 3.426l-1.173.442c-1.19.446-2.381.892-3.506 1.377-9.361 4.038-19.699 7.3-30.65 10.094-3.56.91-7.134 1.837-10.467 2.938-3.881 1.279-7.23 2.891-10.578 4.503h-.001l-.001.001h-.001l-.001.001h-.001c-1.026.494-2.051.988-3.092 1.472l-2.444 1.139-.01.004h-.002c-3.773 1.76-7.547 3.518-11.383 5.24l-2.553-1.352c4.429-1.83 8.78-3.71 13.132-5.59l.001-.001 3.3-1.425c.946-.407 1.883-.82 2.821-1.232h.001c4.133-1.819 8.268-3.637 13.055-5.017a408.117 408.117 0 0 1 12.129-3.27c8.695-2.22 16.739-4.937 24.357-8 1.203-.484 2.431-.952 3.659-1.42 1.388-.53 2.776-1.058 4.129-1.61 1.01-.411 1.958-.902 2.691-1.442.67-.493 1.36-.98 2.051-1.468 2.273-1.605 4.549-3.212 6.094-5.04 2.673-3.164 6.436-5.96 10.638-8.632l-.003.002c3.425-2.178 6.11-4.583 8.457-7.105 1.651-1.778 3.537-3.502 5.42-5.223l.737-.674c.362-.332.707-.667 1.036-1.005a68.636 68.636 0 0 1-1.263-.906 27.162 27.162 0 0 1-1.51 1.534l-.326.305c-1.546 1.445-3.099 2.897-4.353 4.409-2.88 3.468-6.569 6.668-11.072 9.66-2.491 1.656-4.77 3.431-6.628 5.286-2.214 2.211-4.537 4.362-7.361 6.394-2.559 1.844-5.362 3.512-9.122 4.741-1.593.522-3.124 1.096-4.644 1.672-7.405 2.807-15.034 5.439-23.397 7.465-10.258 2.487-19.634 5.637-28.184 9.432-5.442 2.417-10.96 4.786-16.775 6.975-.255.096-.509.193-.761.29L126 97h-1.465c.769-.31 1.542-.617 2.316-.924 1.404-.559 2.808-1.117 4.188-1.688 1.975-.817 3.939-1.64 5.903-2.464 2.904-1.218 5.808-2.436 8.746-3.633 6.879-2.802 14.084-5.356 21.952-7.411l1.564-.408.005-.001c3.698-.962 7.406-1.927 10.921-3.041 6.325-2.006 12.494-4.141 18.657-6.275 2.258-.782 4.449-1.642 6.422-2.6 1.409-.683 2.541-1.526 3.652-2.354l.205-.153c.377-.28.76-.56 1.144-.838 1.473-1.072 2.952-2.146 4.071-3.308 2.426-2.517 5.138-4.93 8.451-7.17 3.448-2.33 6.589-4.752 8.863-7.447.33-.392.657-.786.984-1.18 1.196-1.443 2.394-2.888 3.809-4.274a40.162 40.162 0 0 0 3.227-3.538 56.287 56.287 0 0 1-1.919-1.55 47.486 47.486 0 0 1-3.242 4.125c-1.484 1.699-2.786 3.44-4.073 5.18-2.126 2.873-5.217 5.465-8.715 7.944-3.169 2.247-6.096 4.565-8.345 7.09-1.237 1.39-3.045 2.582-4.857 3.777-.504.332-1.008.665-1.5 1.002h.009c-2.727 1.866-6.152 3.263-10.041 4.462a730.792 730.792 0 0 0-10.24 3.268h-.001a743.173 743.173 0 0 1-10.123 3.232c-2.363.73-4.8 1.397-7.237 2.065h-.002c-2.055.563-4.11 1.126-6.121 1.727-8.342 2.49-16.091 5.399-23.506 8.559-4.573 1.95-9.371 3.772-14.158 5.59l-.099.037A127.864 127.864 0 0 0 120.024 97h-4.167c4.199-1.885 8.67-3.606 13.148-5.33l.206-.08c2.973-1.144 5.851-2.35 8.73-3.558h.001c1.663-.698 3.326-1.396 5.008-2.081 7.788-3.175 15.697-6.259 24.425-8.768 2.029-.585 3.915-1.3 5.798-2.015h.001l.001-.001h.002l.001-.001h.002l.001-.001c.61-.231 1.218-.463 1.832-.689.449-.166.824-.382 1.2-.599.172-.1.345-.199.525-.294-.062-.048-.126-.094-.188-.14-.096.011-.195.02-.295.028-.208.018-.417.036-.594.082-2.366.624-4.798 1.184-7.23 1.744-4.722 1.087-9.443 2.174-13.676 3.731-2.724 1.002-5.407 2.033-8.09 3.063h-.001a616.223 616.223 0 0 1-7.966 3.018c-4.555 1.678-9.16 3.324-13.874 4.884-6.476 2.143-12.653 4.46-18.543 7.007h-6.593c1.975-.86 3.942-1.725 5.909-2.59l.002-.001h.002l.002-.002h.002l.002-.001.002-.001.001-.001h.002l.002-.002h.002l.002-.001.002-.001 1.737-.764c4.09-1.797 8.619-3.348 13.122-4.89l.982-.337a306.097 306.097 0 0 0 24.174-9.462l.577-.253.416-.184h.001c4.782-2.108 9.578-4.222 15.028-5.899a82.043 82.043 0 0 1 3.766-1.074c3.76-.963 7.249-2.132 10.458-3.513 5.13-2.204 10.727-4.001 16.878-5.404 5.845-1.333 10.595-3.362 14.034-6.18 1.889-1.546 3.883-3.06 5.878-4.573h.001c1.41-1.07 2.821-2.14 4.194-3.222ZM90.623 97H74.347a491.01 491.01 0 0 1 3.311-1.158c.968-.335 1.939-.668 2.909-1.002 4.64-1.595 9.283-3.192 13.728-4.919 5.388-2.093 10.838-4.127 16.63-5.92 7.591-2.35 14.808-4.968 21.516-7.928 3.84-1.695 7.593-3.442 11.345-5.19l.004-.001c1.384-.645 2.768-1.29 4.157-1.932 4.098-1.894 8.324-3.698 13.235-5.047a20.819 20.819 0 0 0 5.792-2.587c2.038-1.3 4.061-2.608 6.013-3.942 3.675-2.516 7.449-4.979 12.273-6.972a50.833 50.833 0 0 0 3.156-1.424c5.171-2.569 9.193-5.566 12.782-8.738 2.73-2.412 4.912-4.905 5.807-7.675v-.001c.168-.521.338-1.043.516-1.564h12.034c-.325 1.015-.579 2.039-.832 3.06v.002l-.001.001v.003h-.001v.004l-.001.001c-.072.293-.145.587-.22.88-1.042 4.105-3.954 7.848-8.509 11.248-3.192 2.382-6.535 4.711-9.879 7.04l-1.481 1.032c-1.761 1.226-4.084 2.152-6.675 2.896-5.48 1.575-10.433 3.486-14.803 5.797-1.878.994-3.824 1.97-5.936 2.834-1.922.786-3.981 1.545-6.204 2.073-5.132 1.221-9.599 2.88-13.807 4.785l-3.565 1.621c-8.341 3.8-16.684 7.6-25.968 10.823-1.252.434-2.508.866-3.764 1.298h-.002c-4.056 1.395-8.114 2.79-12.028 4.282-2.367.902-4.619 1.882-6.87 2.861h-.001v.001c-1.928.838-3.855 1.677-5.855 2.468-.841.331-1.685.661-2.53.99Zm-57.755-9.584-1.907-2.248c3.813-1.157 7.294-2.55 10.436-4.185l.405-.212c1.806-.942 3.623-1.89 5.63-2.712 2.916-1.194 5.886-2.353 8.857-3.511h.001c2.011-.785 4.022-1.57 6.016-2.365 2.364-.943 4.702-1.91 6.931-2.935 3.015-1.386 5.174-3.094 6.443-5.053l.051-.08c2.22-3.425 4.443-6.852 6.435-10.311.704-1.225 1.143-2.566.97-3.828-.34-2.465-1.194-4.906-2.713-7.276-2.411-3.763-2.606-7.548.094-11.294l.294-.406H88.7c-.184.49-.359.982-.529 1.474-1.004 2.916-.18 5.69 2.547 8.312.507.487 1.008.976 1.51 1.465h.001v.001h.001v.001h.001v.001h.001v.001l.002.001c1.296 1.263 2.592 2.526 3.97 3.764 1.29 1.162 1.75 2.35 1.137 3.642-.041.085-.08.171-.12.257-.155.335-.31.67-.54.991-3.383 4.756-7.279 9.397-12.125 13.82-3.08 2.812-6.743 5.403-11.837 7.368-3.315 1.278-6.74 2.481-10.163 3.684l-.953.335c-.815.286-1.633.571-2.45.856h-.003l-.003.002c-4.904 1.708-9.806 3.415-14.169 5.487l-.826.393-.006.003c-3.07 1.46-6.14 2.921-9.712 4.066-.518.167-1.04.33-1.565.492ZM168.313 31h-9.915c-.299.267-.615.532-.949.792-4.732 3.695-8.392 7.655-11.834 11.683-1.678 1.963-3.457 3.915-5.503 5.783-2.571 2.346-6.363 4.211-10.165 6.048a372.713 372.713 0 0 1-4.098 1.94c-2.453 1.149-4.906 2.298-7.241 3.506-2.028 1.05-3.762 2.255-5.479 3.448l-.345.24c-3.737 2.59-7.63 5.112-11.929 7.468-4.446 2.436-9.902 4.165-15.547 5.773-5.758 1.64-11.504 3.29-17.25 4.939h-.002l-.003.001-.003.001h-.003l-.002.002h-.003l-8.887 2.55c-4.046 1.158-7.614 2.637-11.006 4.234-3.164 1.49-6.602 2.77-10.356 3.813l1.364 1.607c4.404-1.218 8.508-2.643 12.213-4.382 3.948-1.852 8.489-3.266 13.156-4.592 3.645-1.036 7.281-2.08 10.918-3.123h.003c6.076-1.744 12.152-3.487 18.265-5.195 6.74-1.884 12.352-4.398 17.11-7.442 1.114-.711 2.21-1.43 3.306-2.15 2.632-1.728 5.265-3.457 8.134-5.077 2.474-1.4 5.265-2.656 8.052-3.91a330.6 330.6 0 0 0 2.595-1.178c.528-.243 1.06-.485 1.592-.726 3.573-1.625 7.153-3.252 9.745-5.328 2.031-1.626 3.835-3.33 5.635-5.03l.002-.001.001-.001.733-.692c2.1-1.973 4.114-3.97 6.113-5.969 2.68-2.68 6.093-5.113 9.509-7.549.458-.326.915-.653 1.371-.98l.27-.192.433-.311ZM51.411 97h7.31c3.272-1.329 6.827-2.451 10.528-3.46.332-.092.665-.182.998-.273l.007-.002c2.089-.568 4.178-1.136 6.185-1.77l1.21-.382h.001c4.21-1.327 8.425-2.656 12.49-4.093 5.71-2.019 11.752-3.744 17.864-5.407 9.019-2.454 17.199-5.46 24.216-9.251 2.688-1.452 5.65-2.746 8.613-4.04h.001c1.477-.646 2.955-1.291 4.398-1.956l.02-.009h.001c5.275-2.432 10.571-4.873 15.405-7.52 2.172-1.19 3.972-2.555 5.773-3.92.85-.645 1.7-1.29 2.59-1.916.713-.503 1.42-1.008 2.128-1.513 2.139-1.526 4.277-3.051 6.567-4.517 1.487-.952 3.374-1.773 5.285-2.521 5.489-2.15 9.37-4.934 12.726-7.956 1.93-1.739 3.257-3.571 4.103-5.494h-6.744c-1.72 2.688-4.445 5.137-8.206 7.344a19.99 19.99 0 0 1-3.062 1.471c-5.159 1.943-9.114 4.414-12.603 7.12-3.513 2.727-7.143 5.414-10.795 8.092-4.593 3.37-10.202 6.29-16.091 9.06l-.406.19c-5.586 2.626-11.16 5.245-16.272 8.119-5.453 3.067-11.943 5.48-19.139 7.385a438.423 438.423 0 0 0-25.556 7.612c-4.684 1.549-9.555 2.96-14.451 4.329-4.44 1.242-8.465 2.768-12.499 4.299a771.093 771.093 0 0 1-2.595.979ZM13 64l.195-.23.378.905L13 64Zm248.422-6.922c-.483.915-.854 1.851-.359 2.804.501.963 1.891 1.455 3.775 1.272-.274-1.588-.904-3.752-2.32-6.095-.371.671-.739 1.344-1.096 2.019Zm3.186 9.952a22.915 22.915 0 0 1-4.502.972c-7.252.817-14.569 1.228-22.013.863-5.17-.253-10.014.224-14.107 1.947-1.436.605-2.74 1.294-4.042 1.982-.31.164-.62.328-.931.49-2.468 1.288-5.194 2.385-8.495 3.07-.328.069-.686.101-1.042.133h-.001c-.165.015-.329.03-.491.048l-.117-.076h-.001l-.055-.037-.06-.04c.119-.1.235-.202.351-.303.247-.217.493-.434.774-.64.501-.368 1.03-.729 1.56-1.09 1.078-.734 2.157-1.47 2.998-2.269 2.497-2.368 4.882-4.778 6.999-7.24 2.423-2.817 5.706-5.302 9.988-7.451 6.522-3.275 12.27-6.832 16.916-10.881a43.983 43.983 0 0 0 1.731-1.593c.625.316.981.48.981.48a33.456 33.456 0 0 1 4.761 2.73c-1.378 1.887-2.897 3.745-4.755 5.531-.943.906-2.055 1.766-3.167 2.626-.614.475-1.227.95-1.812 1.431-.199.164-.401.326-.603.49-.81.652-1.623 1.307-2.236 2.006-1.222 1.392-.595 2.532 1.693 3.525 2.135.927 4.679 1.383 7.426 1.55 1.947.12 3.905.201 5.863.26 2.567.077 4.77-.305 6.781-.934a12.652 12.652 0 0 1-.389 2.42h-.003Z"
                clipRule="evenodd"
                opacity={0.15}
            />
            <defs>
                <linearGradient
                    id="a-wave"
                    x1={-4}
                    x2={143}
                    y1={116.5}
                    y2={49.5}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#fff" stopOpacity={0} />
                    <stop offset={1} />
                </linearGradient>
            </defs>
        </svg>
    );
};
