module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      ["inline-import", { extensions: [".sql"] }],
      "react-native-worklets/plugin",
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@/components": "./src/components",
            "@/constants": "./src/constants",
            "@/expo-sqlite": "./src/expo-sqlite",
            "@/helpers": "./src/helpers",
            "@/hooks": "./src/hooks",
            "@/interfaces": "./src/interfaces",
            "@/screens": "./src/screens",
            "@/stores": "./src/stores",
            "@/types": "./src/types",
            "@/utils": "./src/utils",
            "@/services": "./src/services",
          },
        },
      ],
    ],
  };
};
