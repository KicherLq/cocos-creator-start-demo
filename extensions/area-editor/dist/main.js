"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.methods = exports.unload = exports.load = void 0;
const utils_1 = require("./utils");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const open_1 = __importDefault(require("./open"));
/**
 * 配置初始化
 */
function initConfig() {
    return __awaiter(this, void 0, void 0, function* () {
        // 读取扩展数据
        const econfig = utils_1.getExtensionConfig();
        console.log('大厅区域编辑器初始化完成');
    });
}
/**
 * 插件加载回调
 */
function load() {
    // 当 package 被正确加载的时候执行
    initConfig();
}
exports.load = load;
/**
 * 插件卸载回调
 */
function unload() {
    // 当 package 被正确卸载的时候执行
}
exports.unload = unload;
/**
 * 插件函数集合
 */
var methods;
(function (methods) {
    /**
     * 打开设置界面
     */
    function openFunctions() {
        Editor.Panel.open(`area-editor.functions`);
    }
    methods.openFunctions = openFunctions;
    function openFunctionsCommon() {
        Editor.Panel.open(`area-editor.common`);
    }
    methods.openFunctionsCommon = openFunctionsCommon;
    function openDoc() {
        let config = JSON.parse(fs_1.default.readFileSync(path_1.default.join(Editor.Project.path, "profiles/v2/packages/engine.json"), { encoding: 'utf-8' }));
        let arr = config["3d"];
        let url = "";
        for (let i = 0; i < arr.length; i++) {
            if (!arr[i] || !arr[i].javascript) {
                continue;
            }
            if (arr[i].javascript.custom && !arr[i].javascript.builtin) {
                url = arr[i].javascript.custom;
                break;
            }
        }
        if (!url) {
            Editor.Dialog.error("模板引擎未正确设置");
            return;
        }
        url = path_1.default.join(url, "docs_game/index.html");
        open_1.default(url, { app: { name: '', arguments: ['-allow-file-access-from-files'] } });
        // const { spawn  } = require("child_process");
        // spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",[url,"-allow-file-access-from-files"]);
    }
    methods.openDoc = openDoc;
})(methods = exports.methods || (exports.methods = {}));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQW1HO0FBRW5HLDRDQUFvQjtBQUNwQixnREFBd0I7QUFDeEIsa0RBQTBCO0FBRzFCOztHQUVHO0FBQ0gsU0FBZSxVQUFVOztRQUNyQixTQUFTO1FBQ1QsTUFBTSxPQUFPLEdBQUcsMEJBQWtCLEVBQUUsQ0FBQztRQUVyQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Q0FBQTtBQUVEOztHQUVHO0FBQ0gsU0FBZ0IsSUFBSTtJQUNoQix1QkFBdUI7SUFDdkIsVUFBVSxFQUFFLENBQUM7QUFDakIsQ0FBQztBQUhELG9CQUdDO0FBRUQ7O0dBRUc7QUFDSCxTQUFnQixNQUFNO0lBQ2xCLHVCQUF1QjtBQUMzQixDQUFDO0FBRkQsd0JBRUM7QUFFRDs7R0FFRztBQUNILElBQWlCLE9BQU8sQ0F1Q3ZCO0FBdkNELFdBQWlCLE9BQU87SUFDcEI7O09BRUc7SUFDSCxTQUFnQixhQUFhO1FBQ3pCLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUZlLHFCQUFhLGdCQUU1QixDQUFBO0lBRUQsU0FBZ0IsbUJBQW1CO1FBQy9CLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUZlLDJCQUFtQixzQkFFbEMsQ0FBQTtJQUVELFNBQWdCLE9BQU87UUFDbkIsSUFBSSxNQUFNLEdBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFFLENBQUMsWUFBWSxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUMsa0NBQWtDLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDeEksSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3RCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtRQUVaLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFO2dCQUMvQixTQUFRO2FBQ1g7WUFFRCxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3hELEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQTtnQkFDOUIsTUFBSzthQUNSO1NBQ0o7UUFFRCxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ04sTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUE7WUFDaEMsT0FBTTtTQUNUO1FBRUQsR0FBRyxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFDLHNCQUFzQixDQUFDLENBQUE7UUFFM0MsY0FBSSxDQUFDLEdBQUcsRUFBRSxFQUFDLEdBQUcsRUFBRSxFQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsK0JBQStCLENBQUMsRUFBQyxFQUFDLENBQUMsQ0FBQTtRQUMxRSwrQ0FBK0M7UUFDL0MsNkdBQTZHO0lBQ2pILENBQUM7SUExQmUsZUFBTyxVQTBCdEIsQ0FBQTtBQUNMLENBQUMsRUF2Q2dCLE9BQU8sR0FBUCxlQUFPLEtBQVAsZUFBTyxRQXVDdkIiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2V0REIsIEVYVEVOU0lPTl9QQVRILCBnZXRFeHRlbnNpb25Db25maWcsIHJlYWRKc29uRmlsZSwgd3JpdGVKc29uRmlsZSB9IGZyb20gJy4vdXRpbHMnO1xuXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgb3BlbiBmcm9tICcuL29wZW4nO1xuXG5cbi8qKlxuICog6YWN572u5Yid5aeL5YyWXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGluaXRDb25maWcoKSB7XG4gICAgLy8g6K+75Y+W5omp5bGV5pWw5o2uXG4gICAgY29uc3QgZWNvbmZpZyA9IGdldEV4dGVuc2lvbkNvbmZpZygpO1xuXG4gICAgY29uc29sZS5sb2coJ+Wkp+WOheWMuuWfn+e8lui+keWZqOWIneWni+WMluWujOaIkCcpO1xufVxuXG4vKipcbiAqIOaPkuS7tuWKoOi9veWbnuiwg1xuICovXG5leHBvcnQgZnVuY3Rpb24gbG9hZCgpIHtcbiAgICAvLyDlvZMgcGFja2FnZSDooqvmraPnoa7liqDovb3nmoTml7blgJnmiafooYxcbiAgICBpbml0Q29uZmlnKCk7XG59XG5cbi8qKlxuICog5o+S5Lu25Y246L295Zue6LCDXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bmxvYWQoKSB7XG4gICAgLy8g5b2TIHBhY2thZ2Ug6KKr5q2j56Gu5Y246L2955qE5pe25YCZ5omn6KGMXG59XG5cbi8qKlxuICog5o+S5Lu25Ye95pWw6ZuG5ZCIXG4gKi9cbmV4cG9ydCBuYW1lc3BhY2UgbWV0aG9kcyB7XG4gICAgLyoqXG4gICAgICog5omT5byA6K6+572u55WM6Z2iXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIG9wZW5GdW5jdGlvbnMoKSB7XG4gICAgICAgIEVkaXRvci5QYW5lbC5vcGVuKGBhcmVhLWVkaXRvci5mdW5jdGlvbnNgKTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gb3BlbkZ1bmN0aW9uc0NvbW1vbigpIHtcbiAgICAgICAgRWRpdG9yLlBhbmVsLm9wZW4oYGFyZWEtZWRpdG9yLmNvbW1vbmApO1xuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBvcGVuRG9jKCkge1xuICAgICAgICBsZXQgY29uZmlnIDogYW55ID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKEVkaXRvci5Qcm9qZWN0LnBhdGgsXCJwcm9maWxlcy92Mi9wYWNrYWdlcy9lbmdpbmUuanNvblwiKSwgeyBlbmNvZGluZzogJ3V0Zi04JyB9KSlcbiAgICAgICAgbGV0IGFyciA9IGNvbmZpZ1tcIjNkXCJdXG4gICAgICAgIGxldCB1cmwgPSBcIlwiXG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghYXJyW2ldIHx8ICFhcnJbaV0uamF2YXNjcmlwdCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhcnJbaV0uamF2YXNjcmlwdC5jdXN0b20gJiYgIWFycltpXS5qYXZhc2NyaXB0LmJ1aWx0aW4pIHtcbiAgICAgICAgICAgICAgICB1cmwgPSBhcnJbaV0uamF2YXNjcmlwdC5jdXN0b21cbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgICAgIEVkaXRvci5EaWFsb2cuZXJyb3IoXCLmqKHmnb/lvJXmk47mnKrmraPnoa7orr7nva5cIilcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgdXJsID0gcGF0aC5qb2luKHVybCxcImRvY3NfZ2FtZS9pbmRleC5odG1sXCIpXG5cbiAgICAgICAgb3Blbih1cmwsIHthcHA6IHtuYW1lOiAnJywgYXJndW1lbnRzOiBbJy1hbGxvdy1maWxlLWFjY2Vzcy1mcm9tLWZpbGVzJ119fSlcbiAgICAgICAgLy8gY29uc3QgeyBzcGF3biAgfSA9IHJlcXVpcmUoXCJjaGlsZF9wcm9jZXNzXCIpO1xuICAgICAgICAvLyBzcGF3bihcIkM6XFxcXFByb2dyYW0gRmlsZXNcXFxcR29vZ2xlXFxcXENocm9tZVxcXFxBcHBsaWNhdGlvblxcXFxjaHJvbWUuZXhlXCIsW3VybCxcIi1hbGxvdy1maWxlLWFjY2Vzcy1mcm9tLWZpbGVzXCJdKTtcbiAgICB9XG59XG4iXX0=
