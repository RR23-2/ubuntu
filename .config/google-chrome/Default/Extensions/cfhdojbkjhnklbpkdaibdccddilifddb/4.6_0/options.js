/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// CONCATENATED MODULE: ./src/core/api/shared/emitter.ts
class MessageEmitter {
    constructor() {
        this.listeners = new Set();
    }
    addListener(listener) {
        this.listeners.add(listener);
    }
    removeListener(listener) {
        this.listeners.delete(listener);
    }
    dispatch(message, sender) {
        const results = [];
        for (const listener of this.listeners) {
            results.push(listener(message, sender));
        }
        return results;
    }
}

;// CONCATENATED MODULE: ./src/core/api/shared/api.ts
function getMessageResponse(responses) {
    for (const response of responses) {
        if (typeof response !== "undefined") {
            return response;
        }
    }
}
function isMessage(candidate) {
    return (candidate !== null && typeof candidate === "object" && "type" in candidate);
}
function isListenMessage(candidate) {
    return isMessage(candidate) && "filter" in candidate;
}
function isPremiumActivateOptions(candidate) {
    return (candidate !== null && typeof candidate === "object" && "userId" in candidate);
}
function isPremiumSubscriptionsAddRemoveOptions(candidate) {
    return (candidate !== null &&
        typeof candidate === "object" &&
        "subscriptionType" in candidate);
}

;// CONCATENATED MODULE: ./src/core/api/front/api.port.ts
let port;
const connectListeners = new Set();
const disconnectListeners = new Set();
const messageListeners = new Set();
function addConnectListener(listener) {
    connectListeners.add(listener);
    listener();
}
function addDisconnectListener(listener) {
    disconnectListeners.add(listener);
}
function addMessageListener(listener) {
    messageListeners.add(listener);
}
const connect = () => {
    if (port) {
        return port;
    }
    try {
        port = browser.runtime.connect({ name: "ui" });
    }
    catch (ex) {
        port = null;
        disconnectListeners.forEach((listener) => {
            listener();
        });
        return port;
    }
    port.onMessage.addListener((message) => {
        onMessage(message);
    });
    port.onDisconnect.addListener(onDisconnect);
    connectListeners.forEach((listener) => {
        listener();
    });
    return port;
};
function listen({ type, filter, ...options }) {
    addConnectListener(() => {
        if (port) {
            port.postMessage({
                type: `${type}.listen`,
                filter,
                ...options
            });
        }
    });
}
function onDisconnect() {
    port = null;
    setTimeout(() => connect(), 100);
}
function onMessage(message) {
    if (!message.type.endsWith(".respond")) {
        return;
    }
    messageListeners.forEach((listener) => {
        listener(message);
    });
}
function removeDisconnectListener(listener) {
    disconnectListeners.delete(listener);
}

;// CONCATENATED MODULE: ./src/core/api/front/api.ts


const messageEmitter = new MessageEmitter();
const platformToStore = {
    chromium: "chrome",
    edgehtml: "edge",
    gecko: "firefox"
};
const app = {
    get: async (what) => await send("app.get", { what }),
    getInfo: async () => {
        return await Promise.all([
            app.get("application"),
            app.get("platform")
        ]).then(([application, rawPlatform]) => {
            var _a;
            const platform = rawPlatform;
            let store;
            if (application !== "edge" && application !== "opera") {
                store = (_a = platformToStore[platform]) !== null && _a !== void 0 ? _a : "chrome";
            }
            else {
                store = application;
            }
            return {
                application,
                manifestVersion: browser.runtime.getManifest().manifest_version,
                platform,
                store
            };
        });
    },
    listen: (filter) => {
        listen({ type: "app", filter });
    },
    open: async (what, options = {}) => await send("app.open", { what, ...options })
};
const ctalinks = {
    get: async (link, queryParams = {}) => await send("app.get", { what: "ctalink", link, queryParams })
};
const doclinks = {
    get: async (link) => await send("app.get", { what: "doclink", link })
};
const filters = {
    get: async () => await send("filters.get"),
    listen: (filter) => {
        listen({ type: "filters", filter });
    }
};
const notifications = {
    get: async (displayMethod) => await send("notifications.get", { displayMethod }),
    seen: async () => await send("notifications.seen")
};
const prefs = {
    get: async (key) => await send("prefs.get", { key }),
    listen: (filter) => {
        listen({ type: "prefs", filter });
    }
};
const premium = {
    activate: async (userId) => await send("premium.activate", { userId }),
    get: async () => await send("premium.get"),
    add: async (subscriptionType) => {
        await send("premium.subscriptions.add", { subscriptionType });
    },
    getPremiumSubscriptionsState: async () => {
        return await send("premium.subscriptions.getState");
    },
    remove: async (subscriptionType) => {
        await send("premium.subscriptions.remove", { subscriptionType });
    },
    listen: (filter) => {
        listen({ type: "premium", filter });
    }
};
const requests = {
    listen: (filter, tabId) => {
        listen({ type: "requests", filter, tabId });
    }
};
async function send(sendType, rawArgs = {}) {
    const args = {
        ...rawArgs,
        type: sendType
    };
    return await browser.runtime.sendMessage(args);
}
const stats = {
    getBlockedPerPage: async (tab) => await send("stats.getBlockedPerPage", { tab }),
    getBlockedTotal: async () => await send("stats.getBlockedTotal"),
    listen: (filter) => {
        listen({ type: "stats", filter });
    }
};
const subscriptions = {
    add: async (url) => await send("subscriptions.add", { url }),
    get: async (options) => await send("subscriptions.get", options),
    getInitIssues: async () => await send("subscriptions.getInitIssues"),
    getRecommendations: async () => await send("subscriptions.getRecommendations"),
    listen: (filter) => {
        listen({ type: "subscriptions", filter });
    },
    remove: async (url) => await send("subscriptions.remove", { url })
};
const info = {
    get: async () => await send("info.get"),
    getInjectionInfo: async () => await send("info.getInjectionInfo")
};
const api_api = {
    addDisconnectListener: addDisconnectListener,
    addListener: addMessageListener,
    app,
    ctalinks,
    doclinks,
    filters,
    notifications,
    prefs,
    premium,
    requests,
    removeDisconnectListener: removeDisconnectListener,
    subscriptions,
    stats
};
/* harmony default export */ const front_api = ((/* unused pure expression or super */ null && (api_api)));
function start() {
    connect();
    if (typeof browser.devtools === "undefined") {
        browser.runtime.onMessage.addListener((message, sender) => {
            const responses = messageEmitter.dispatch(message, sender);
            const response = getMessageResponse(responses);
            if (typeof response === "undefined") {
                return;
            }
            return Promise.resolve(response);
        });
    }
}
start();

;// CONCATENATED MODULE: ./src/core/api/front/index.ts




/* harmony default export */ const front = ((/* unused pure expression or super */ null && (api)));

;// CONCATENATED MODULE: ./src/options/ui/options.ts

async function options_start() {
    var _a;
    const os = await app.get("os");
    const iframe = document.getElementById("content");
    if (!(iframe instanceof HTMLIFrameElement)) {
        return;
    }
    iframe.addEventListener("load", () => {
        var _a, _b;
        document.title = (_b = (_a = iframe.contentDocument) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : "";
    });
    const frameUrl = (_a = iframe.getAttribute("data-src-" + os)) !== null && _a !== void 0 ? _a : iframe.getAttribute("data-src");
    if (!frameUrl) {
        return;
    }
    iframe.setAttribute("src", frameUrl);
    document.body.hidden = false;
}
void options_start().catch(console.error);

;// CONCATENATED MODULE: ./src/options/ui/index.ts


/******/ })()
;