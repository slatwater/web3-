// ==UserScript==
// @name         Auto Click on MintChain Mint Forest
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  自动点击MintChain页面上的动态按钮（移除第二个元素点击功能）
// @match        *://www.mintchain.io/mint-forest*
// @updateURL    https://github.com/slatwater/web3-/raw/refs/heads/main/Mint%E7%82%B9%E5%87%BB.user.js
// @downloadURL  https://github.com/slatwater/web3-/raw/refs/heads/main/Mint%E7%82%B9%E5%87%BB.user.js
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // 在MintChain Mint Forest页面上执行
    if (window.location.hostname === 'www.mintchain.io' && window.location.pathname === '/mint-forest') {
        console.log('检测到MintChain Mint Forest页面。');

        // 使用通配符查找 bubble-root 开头的第一个 img 元素
        function clickDynamicElement() {
            const dynamicButton = document.evaluate('//*[starts-with(@id, "bubble-root-")]/img', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (dynamicButton) {
                console.log('找到动态按钮，模拟点击...');
                dynamicButton.click();
                console.log('已点击动态按钮。');
            } else {
                console.log('未找到动态按钮，重试中...');
                setTimeout(clickDynamicElement, 1000); // 每隔1秒重试一次
            }
        }

        // 页面加载完成后的操作
        window.addEventListener('load', () => {
            console.log('页面已加载，开始检查元素...');
            // 设置随机延迟2-5秒后开始执行脚本
            let delay = getRandomInt(2000, 5000);
            console.log(`等待 ${delay / 1000} 秒后开始执行脚本...`);
            setTimeout(clickDynamicElement, delay);
        });

        // 获取随机整数函数
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
})();
