import React from "react";

/**
 * Exact SVG definitions and distressed ink/asteroid brush filters extracted from
 * the Astra® Framer reference project, paired with Qorvaynology's Continuum mark.
 */
export function AstraStarLogo({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36.001 36.001"
      overflow="visible"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M 16.808 1.039 C 17 -0.346 19.001 -0.346 19.193 1.039 L 20.423 9.93 C 20.83 12.864 23.137 15.171 26.071 15.578 L 34.962 16.808 C 36.347 17 36.347 19.001 34.962 19.193 L 26.071 20.423 C 23.137 20.83 20.83 23.137 20.423 26.071 L 19.193 34.962 C 19.001 36.347 17 36.347 16.808 34.962 L 15.578 26.071 C 15.171 23.137 12.864 20.83 9.93 20.423 L 1.039 19.193 C -0.346 19.001 -0.346 17 1.039 16.808 L 9.93 15.578 C 12.864 15.171 15.171 12.864 15.578 9.93 Z" />
    </svg>
  );
}

export function HeroAsteroidStreaks() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden z-[2]"
    >
      {/* Main horizontal ink/shadow bar cutting across the left white planet */}
      <div className="absolute top-[41.5%] left-0 w-[47vw] max-w-[680px] h-[22px] bg-gradient-to-r from-[#05070E] via-[#05070E] to-transparent" />

      {/* Line 3: Distressed displacement stroke across the white planet */}
      <svg
        className="absolute left-[8px] top-[39.2%] w-[26vw] max-w-[377px] h-[48px]"
        viewBox="-1 -1 377 48"
        fill="none"
        preserveAspectRatio="none"
      >
        <g filter="url(#qorv_filter_line3)">
          <line
            x1="-106.977"
            y1="11.5006"
            x2="363.019"
            y2="33.5944"
            stroke="#080B14"
            strokeWidth="2.5"
          />
        </g>
        <defs>
          <filter
            id="qorv_filter_line3"
            x="-118"
            y="0.00110626"
            width="492.043"
            height="45.0927"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.25 0.25"
              numOctaves="3"
              seed="5152"
            />
            <feDisplacementMap
              in="shape"
              scale="22"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displacedImage"
            />
          </filter>
        </defs>
      </svg>

      {/* Line 4: Counter-angled displaced ink streak */}
      <svg
        className="absolute left-[-30px] top-[41.6%] w-[28vw] max-w-[406px] h-[51px]"
        viewBox="-1 -1 406 51"
        fill="none"
        preserveAspectRatio="none"
      >
        <g filter="url(#qorv_filter_line4)">
          <line
            x1="-130.025"
            y1="37.1693"
            x2="392.728"
            y2="11.5006"
            stroke="#080B14"
            strokeWidth="3"
          />
        </g>
        <defs>
          <filter
            id="qorv_filter_line4"
            x="-141.049"
            y="0.00120544"
            width="544.802"
            height="48.6675"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.25 0.25"
              numOctaves="3"
              seed="5152"
            />
            <feDisplacementMap
              in="shape"
              scale="22"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displacedImage"
            />
          </filter>
        </defs>
      </svg>

      {/* Line 1: Asteroid splatter cluster */}
      <svg
        className="absolute left-[-4px] top-[40.4%] w-[107px] h-[22px]"
        viewBox="0 0 107 22"
        fill="none"
      >
        <g filter="url(#qorv_filter_line1)">
          <path
            d="M6.13118 3.61137L10.3483 4.18844C13.1879 4.57663 15.2281 6.40668 14.9036 8.27632C14.579 10.146 12.0133 11.3468 9.17364 10.9586L4.95642 10.3825C2.11687 9.99422 0.0781477 8.1634 0.402678 6.29377C0.727353 4.42439 3.29195 3.22347 6.13118 3.61137ZM65.843 10.434C67.4206 10.3275 68.9452 11.1073 69.2492 12.1754C69.5529 13.2433 68.5213 14.1952 66.944 14.3019L60.3209 14.7492C58.7434 14.8555 57.2187 14.0758 56.9148 13.0078C56.611 11.9399 57.6428 10.988 59.22 10.8813L65.843 10.434ZM102.911 15.3824C103.698 14.886 105 14.9488 105.818 15.5219C106.635 16.095 106.66 16.9616 105.873 17.4581L105.676 17.5832C104.89 18.0795 103.589 18.0176 102.771 17.4448C101.953 16.8717 101.927 16.004 102.714 15.5075L102.911 15.3824ZM37.9099 7.21645C38.2733 6.5401 39.4189 6.23935 40.4685 6.54479L42.7782 7.21678C43.8278 7.52222 44.3842 8.31821 44.0209 8.99454C43.6576 9.67088 42.512 9.9716 41.4623 9.6662L39.1527 8.99422C38.1031 8.68879 37.5466 7.89279 37.9099 7.21645ZM85.8181 9.27028C87.418 9.46591 88.5958 10.4808 88.4477 11.5363C88.2992 12.5915 86.8814 13.2885 85.2818 13.0929L78.5674 12.2714C76.9676 12.0757 75.7898 11.0617 75.9377 10.0063C76.0859 8.95081 77.5038 8.25409 79.1036 8.44973L85.8181 9.27028Z"
            fill="#05070E"
          />
        </g>
        <defs>
          <filter
            id="qorv_filter_line1"
            x="-2.63123"
            y="0.538567"
            width="112.079"
            height="20.3798"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.2 0.2"
              numOctaves="3"
              seed="496"
            />
            <feDisplacementMap
              in="shape"
              scale="6"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Line 2: Fine asteroid dust */}
      <svg
        className="absolute left-[-15px] top-[45.7%] w-[49px] h-[9px]"
        viewBox="0 0 49 9"
        fill="none"
      >
        <path
          d="M46.0423 5.13834L44.108 5.09327C42.8056 5.06319 41.7695 3.91985 41.7945 2.53913C41.8195 1.15841 42.896 0.0635612 44.1985 0.0936353L46.1328 0.138012C47.4352 0.168117 48.4707 1.31215 48.4457 2.69286C48.4205 4.07339 47.3446 5.16823 46.0423 5.13834ZM18.7408 5.47523C18.0381 5.69148 17.3018 5.26217 17.096 4.51657C16.8903 3.77107 17.2928 2.99162 17.9954 2.77525L20.9457 1.86718C21.6485 1.65101 22.3847 2.08028 22.5906 2.82583C22.7963 3.57131 22.3937 4.35074 21.6911 4.56716L18.7408 5.47523Z"
          fill="#05070E"
        />
      </svg>
    </div>
  );
}

export function TitleAsteroidSplatter({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 75 19"
      fill="none"
      className={`pointer-events-none w-[83px] h-[19px] ${className}`}
      aria-hidden="true"
    >
      <g filter="url(#qorv_filter_title_ast)">
        <path
          d="M5.26638 3.98246L8.16567 4.42676C10.1179 4.7256 11.477 6.30839 11.2002 7.96236C10.9234 9.61634 9.11584 10.7147 7.16358 10.4159L4.26419 9.97245C2.31197 9.67358 0.953885 8.09008 1.23072 6.43613C1.50764 4.78239 3.31437 3.68387 5.26638 3.98246ZM46.3565 9.08431C47.4502 8.96621 48.4823 9.63056 48.6625 10.568C48.8424 11.5052 48.1025 12.3606 47.0091 12.4789L42.4177 12.9749C41.3241 13.0929 40.2919 12.4286 40.1117 11.4913C39.9317 10.554 40.6717 9.69868 41.7651 9.58035L46.3565 9.08431ZM71.8447 12.8804C72.4026 12.4305 73.3008 12.4659 73.8502 12.9588C74.3993 13.4517 74.392 14.2157 73.8342 14.6657L73.6944 14.779C73.1367 15.2288 72.2393 15.1941 71.6899 14.7015C71.1404 14.2086 71.1471 13.4437 71.7049 12.9937L71.8447 12.8804ZM27.1353 6.67481C27.4055 6.0727 28.206 5.78988 28.9231 6.04318L30.501 6.60045C31.2181 6.85374 31.5804 7.54726 31.3103 8.14935C31.0401 8.75144 30.2396 9.03423 29.5225 8.78097L27.9446 8.22371C27.2275 7.97042 26.8652 7.2769 27.1353 6.67481ZM60.1989 7.75165C61.2994 7.89967 62.0853 8.77673 61.9532 9.70992C61.8209 10.6429 60.8212 11.2793 59.7208 11.1313L55.1019 10.5097C54.0014 10.3617 53.2155 9.48541 53.3474 8.5523C53.4795 7.61911 54.4793 6.98288 55.5798 7.1309L60.1989 7.75165Z"
          fill="#040404"
        />
      </g>
      <defs>
        <filter
          id="qorv_filter_title_ast"
          x="-1.80505"
          y="0.933502"
          width="79.0624"
          height="17.1614"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.2 0.2"
            numOctaves="3"
            seed="496"
          />
          <feDisplacementMap
            in="shape"
            scale="6"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
