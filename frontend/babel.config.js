module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"], //  루트 디렉토리 명시
          alias: {
            "@": "./src", // "@/..." 형태 import 가능
          },
        },
      ],
    ],
  };
};
