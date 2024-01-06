import { useContext } from "react";
import { AppContext } from "../../provider/Provider.State";

export const ExpandButton = ({ tier }) => {
  const { nestedVisible, setNestedVisible } = useContext(AppContext);
  return (
    <div
      className={`cursor-pointer sidebarItem flex items-center justify-center sidebarButton${
        tier == nestedVisible ? "Select" : ""
      } h-[36px] w-[36px]`}
      onClick={() => {
        setNestedVisible(tier == nestedVisible ? 0 : tier);
      }}
    >
      {tier == nestedVisible ? <Contract /> : <Expand />}
    </div>
  );
};

const Contract = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12.0188 6.64278C12.0188 6.51017 11.9661 6.38299 11.8723 6.28923C11.7786 6.19546 11.6514 6.14278 11.5188 6.14278H9.85745V4.48145C9.85745 4.34884 9.80477 4.22166 9.711 4.12789C9.61723 4.03412 9.49005 3.98145 9.35745 3.98145C9.22484 3.98145 9.09766 4.03412 9.00389 4.12789C8.91012 4.22166 8.85745 4.34884 8.85745 4.48145V6.64278C8.85745 6.91945 9.08078 7.14278 9.35745 7.14278H11.5188C11.6514 7.14278 11.7786 7.0901 11.8723 6.99633C11.9661 6.90256 12.0188 6.77539 12.0188 6.64278ZM9.35745 12.0188C9.49005 12.0188 9.61723 11.9661 9.711 11.8723C9.80477 11.7786 9.85745 11.6514 9.85745 11.5188V9.85678H11.5188C11.6514 9.85678 11.7786 9.8041 11.8723 9.71033C11.9661 9.61656 12.0188 9.48939 12.0188 9.35678C12.0188 9.22417 11.9661 9.09699 11.8723 9.00323C11.7786 8.90946 11.6514 8.85678 11.5188 8.85678H9.35745C9.22484 8.85678 9.09766 8.90946 9.00389 9.00323C8.91012 9.09699 8.85745 9.22417 8.85745 9.35678V11.5188C8.85745 11.7948 9.08078 12.0188 9.35745 12.0188ZM6.64278 12.0188C6.51017 12.0188 6.38299 11.9661 6.28923 11.8723C6.19546 11.7786 6.14278 11.6514 6.14278 11.5188V9.85678H4.48145C4.34884 9.85678 4.22166 9.8041 4.12789 9.71033C4.03412 9.61656 3.98145 9.48939 3.98145 9.35678C3.98145 9.22417 4.03412 9.09699 4.12789 9.00323C4.22166 8.90946 4.34884 8.85678 4.48145 8.85678H6.64278C6.77539 8.85678 6.90256 8.90946 6.99633 9.00323C7.0901 9.09699 7.14278 9.22417 7.14278 9.35678V11.5188C7.14278 11.6514 7.0901 11.7786 6.99633 11.8723C6.90256 11.9661 6.77539 12.0188 6.64278 12.0188ZM3.98145 6.64278C3.98145 6.51017 4.03412 6.38299 4.12789 6.28923C4.22166 6.19546 4.34884 6.14278 4.48145 6.14278H6.14278V4.48145C6.14278 4.34884 6.19546 4.22166 6.28923 4.12789C6.38299 4.03412 6.51017 3.98145 6.64278 3.98145C6.77539 3.98145 6.90256 4.03412 6.99633 4.12789C7.0901 4.22166 7.14278 4.34884 7.14278 4.48145V6.64278C7.14278 6.77539 7.0901 6.90256 6.99633 6.99633C6.90256 7.0901 6.77539 7.14278 6.64278 7.14278H4.48145C4.34884 7.14278 4.22166 7.0901 4.12789 6.99633C4.03412 6.90256 3.98145 6.77539 3.98145 6.64278Z"
      fill="white"
    />
  </svg>
);

const Expand = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9.10918 4.22852C9.10918 4.50452 9.33318 4.72852 9.60918 4.72852H11.2712V6.39052C11.2712 6.52312 11.3239 6.6503 11.4176 6.74407C11.5114 6.83784 11.6386 6.89052 11.7712 6.89052C11.9038 6.89052 12.031 6.83784 12.1247 6.74407C12.2185 6.6503 12.2712 6.52312 12.2712 6.39052V4.22852C12.2712 4.09591 12.2185 3.96873 12.1247 3.87496C12.031 3.78119 11.9038 3.72852 11.7712 3.72852H9.60918C9.47657 3.72852 9.3494 3.78119 9.25563 3.87496C9.16186 3.96873 9.10918 4.09591 9.10918 4.22852ZM11.7712 9.10918C11.6386 9.10918 11.5114 9.16186 11.4176 9.25563C11.3239 9.3494 11.2712 9.47657 11.2712 9.60918V11.2712H9.60918C9.47657 11.2712 9.3494 11.3239 9.25563 11.4176C9.16186 11.5114 9.10918 11.6386 9.10918 11.7712C9.10918 11.9038 9.16186 12.031 9.25563 12.1247C9.3494 12.2185 9.47657 12.2712 9.60918 12.2712H11.7712C11.9038 12.2712 12.031 12.2185 12.1247 12.1247C12.2185 12.031 12.2712 11.9038 12.2712 11.7712V9.60918C12.2712 9.47657 12.2185 9.3494 12.1247 9.25563C12.031 9.16186 11.9038 9.10918 11.7712 9.10918ZM4.22852 9.10918C4.36112 9.10918 4.4883 9.16186 4.58207 9.25563C4.67584 9.3494 4.72852 9.47657 4.72852 9.60918V11.2712H6.39052C6.52312 11.2712 6.6503 11.3239 6.74407 11.4176C6.83784 11.5114 6.89052 11.6386 6.89052 11.7712C6.89052 11.9038 6.83784 12.031 6.74407 12.1247C6.6503 12.2185 6.52312 12.2712 6.39052 12.2712H4.22852C4.09591 12.2712 3.96873 12.2185 3.87496 12.1247C3.78119 12.031 3.72852 11.9038 3.72852 11.7712V9.60918C3.72852 9.47657 3.78119 9.3494 3.87496 9.25563C3.96873 9.16186 4.09591 9.10918 4.22852 9.10918ZM6.89052 4.22852C6.89052 4.36112 6.83784 4.4883 6.74407 4.58207C6.6503 4.67584 6.52312 4.72852 6.39052 4.72852H4.72852V6.39052C4.72852 6.52312 4.67584 6.6503 4.58207 6.74407C4.4883 6.83784 4.36112 6.89052 4.22852 6.89052C4.09591 6.89052 3.96873 6.83784 3.87496 6.74407C3.78119 6.6503 3.72852 6.52312 3.72852 6.39052V4.22852C3.72852 4.09591 3.78119 3.96873 3.87496 3.87496C3.96873 3.78119 4.09591 3.72852 4.22852 3.72852H6.39052C6.52312 3.72852 6.6503 3.78119 6.74407 3.87496C6.83784 3.96873 6.89052 4.09591 6.89052 4.22852Z"
      fill="white"
    />
  </svg>
);
