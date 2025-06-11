import createNextIntlPlugin from "next-intl/plugin";

import autoCert from "anchor-pki/auto-cert/integrations/next";

const withAutoCert = autoCert({
    enabledEnv: "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
            };
        }
        return config;
    },
    experimental: {
        serverComponentsExternalPackages: ["@stripe/stripe-js"],
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "sdhruyqfvlixtieyedcc.supabase.co",
                port: "",
                pathname: "/storage/v1/object/public/categories//**",
                search: "",
            },
            {
                protocol: "https",
                hostname: "sdhruyqfvlixtieyedcc.supabase.co",
                port: "",
                pathname: "/storage/v1/object/public/product-images/**",
                search: "",
            },
        ],
    },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(withAutoCert(nextConfig));
