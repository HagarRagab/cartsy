"use client";

import { useState } from "react";
import Image from "next/image";

function OptimizedImage({
    src,
    alt,
    fill = false,
    width,
    height,
    className = "",
    priority = false,
    loading,
    sizes,
    ...props
}) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    return (
        <div className={`relative ${fill ? "w-full h-full" : ""}`}>
            {isLoading && (
                <div
                    className={`absolute inset-0 bg-bg-300 animate-pulse ${fill ? "" : "rounded-lg"}`}
                    aria-hidden="true"
                />
            )}
            {hasError && (
                <div
                    className={`absolute inset-0 bg-bg-300 flex items-center justify-center ${fill ? "" : "rounded-lg"}`}
                    aria-hidden="true"
                >
                    <span className="text-text-500 text-sm">
                        Image not available
                    </span>
                </div>
            )}
            <Image
                src={src}
                alt={alt}
                fill={fill}
                width={!fill ? width : undefined}
                height={!fill ? height : undefined}
                className={`${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
                priority={priority}
                loading={loading}
                sizes={sizes}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setIsLoading(false);
                    setHasError(true);
                }}
                {...props}
            />
        </div>
    );
}

export default OptimizedImage;
