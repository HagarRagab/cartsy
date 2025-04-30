/** @type {import('next').NextConfig} */
const nextConfig = {
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

export default nextConfig;
