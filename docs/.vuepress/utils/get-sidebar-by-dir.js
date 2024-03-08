/*
 * @name:
 * @author: wuxd
 * @Date: 2021-03-24 10:20:33
 * @LastEditTime: 2021-04-22 19:08:55
 */
const path = require("path");
const dirTree = require("directory-tree");
const SRC_PATH = path.resolve(__dirname, "../src");
const STATIC_DIR = 'images';

function toSidebarOption(tree = [], rootPath, staticDir) {
    if (!Array.isArray(tree)) return [];

    var sideFile = [];
    var sideDirectory = [];
    tree.forEach(v => {
        // 过滤掉图片文件夹
        if (v.type === "directory") {
            // console.log("vvv", v);
            if (v.name !== staticDir) {
                sideDirectory.push({
                    title: v.name,
                    collapsible: true, // 可选的, 默认值是 true,
                    // sidebarDepth: 5,
                    initialOpenGroupIndex: -1, // 初始展开下标，默认是0
                    children: toSidebarOption(v.children, rootPath + v.name + "/", staticDir)
                })
            }

        } else {

            var namePrev = '';
            if (v.name === 'README.md') {
                namePrev = '';
                // 若为文件且为README，添加到开头
                sideFile.unshift(rootPath);
            } else {
                // 若为普通文件，添加到README之后
                namePrev = v.name.split(".md")[0];
                sideFile.push(rootPath + namePrev + ".html");
            }
        }
    });

    return [...sideFile, ...sideDirectory];

    // return sidebar
//     return tree.map((v) => {

//     if (v.type === "directory") {
//       // console.log("vvv", v);
//       return {
//         text: v.name,
//         collapsable: true, // 可选的, 默认值是 true,
//         children: toSidebarOption(v.children,rootPath + v.name + "/"),
//       };
//     } else {

//         var namePrev = '';
//         if (v.name === 'README.md') {
//             namePrev = '';
//         } else {
//             namePrev = v.name.split(".md")[0];

//         }
//         return rootPath + namePrev;
//     }

//   });
}

/**
 * @desc 根据 自定义文件夹'docs/src'自动生成vuepress的sidebar选项
 * @param {string} srcPath 自定义文件夹路径,必须在docs文件夹下
 * @returns {object[]}
 */
function autoGetSidebarOptionBySrcDir(srcPath = SRC_PATH, staticDir = STATIC_DIR) {
    const srcDir = dirTree(srcPath, {
        extensions: /\.md$/,
        normalizePath: true,
    });
    // console.log(srcDir);
    dirs = srcDir.children.slice(1, srcDir.children.length);
    // console.log(dirs[2]);
    // console.log(dirs[1].children);
    var rootPath = '/'
    // 全部挂载在/下面
    var sidebar = {
        '/': toSidebarOption(dirs, rootPath, staticDir)
    };
    return sidebar;
}

module.exports = autoGetSidebarOptionBySrcDir;
