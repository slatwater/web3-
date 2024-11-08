// ==UserScript==
// @name         Arcana P12 自动化脚本
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  [版本 1.4] 自动化执行指定步骤的脚本。
// @author       Assistant
// @match        https://arcana.p12.games/*
// @grant        none
// @updateURL    https://github.com/slatwater/web3-/raw/refs/heads/main/P12.user.js
// @downloadURL  https://github.com/slatwater/web3-/raw/refs/heads/main/P12.user.js
// ==/UserScript==

(function() {
    'use strict';

    // 随机延迟函数
    function randomDelay(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // 等待元素出现的函数（使用 XPath）
    function waitForElementByXpath(xpath) {
        return new Promise(function(resolve) {
            let element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (element) {
                return resolve(element);
            }
            const observer = new MutationObserver(function() {
                element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                if (element) {
                    observer.disconnect();
                    return resolve(element);
                }
            });
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }

    // 等待元素出现的函数（使用选择器）
    function waitForElementBySelector(selector) {
        return new Promise(function(resolve) {
            let element = document.querySelector(selector);
            if (element) {
                return resolve(element);
            }
            const observer = new MutationObserver(function() {
                element = document.querySelector(selector);
                if (element) {
                    observer.disconnect();
                    return resolve(element);
                }
            });
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }

    // 延迟函数
    function delay(time) {
        return new Promise(function(resolve) {
            setTimeout(resolve, time);
        });
    }

    // 主函数
    async function main() {
        console.log('脚本开始执行');

        // 随机延迟
        await delay(randomDelay(1000, 3000));

        // 第一步：点击元素1
        const element1Xpath = '//*[@id="__next"]/div/div[1]/main/div/div[2]/div[2]/div[2]';
        const element1 = await waitForElementByXpath(element1Xpath);
        console.log('找到元素1，准备点击');
        await delay(randomDelay(500, 1500));
        element1.click();
        console.log('已点击元素1');

        // 第二步：等待小窗口1出现
        const smallWindow1Xpath = '//*[@id=":r11:"]/div/div';
        const smallWindow1 = await waitForElementByXpath(smallWindow1Xpath);
        console.log('小窗口1已出现');

        // 第三步：随机点击小窗口1中的一个元素2
        await delay(randomDelay(500, 1500));
        const element2List = Array.from(smallWindow1.querySelectorAll('div')).filter(el => {
            return el.textContent.trim() === 'Featured';
        });

        if (element2List.length === 0) {
            console.log('未找到元素2');
            return;
        }

        const randomElement2 = element2List[Math.floor(Math.random() * element2List.length)];
        console.log('找到元素2，准备点击');
        await delay(randomDelay(500, 1500));
        randomElement2.click();
        console.log('已点击元素2');

        // 第四步：等待小窗口2出现
        const smallWindow2Xpath = '//*[@id=":r1j:"]/div/div[2]';
        const smallWindow2 = await waitForElementByXpath(smallWindow2Xpath);
        console.log('小窗口2已出现');

        // 第五步：点击小窗口2中的元素3
        const element3Xpath = '//*[@id=":r1j:"]/div/div[2]/div[4]/div/div[2]/div[1]/p[2]';
        const element3 = await waitForElementByXpath(element3Xpath);
        console.log('找到元素3，准备点击');
        await delay(randomDelay(500, 1500));
        element3.click();
        console.log('已点击元素3');

        // 第六步：点击小窗口2中的元素4
        const element4Xpath = '//*[@id=":r1j:"]/div/div[2]/div[4]/button';
        const element4 = await waitForElementByXpath(element4Xpath);
        console.log('找到元素4，准备点击');
        await delay(randomDelay(500, 1500));
        element4.click();
        console.log('已点击元素4');

        // 第七步：点击元素5
        const element5Selector = '#\\:r1j\\: > div > div.flex-center.absolute.right-7.top-7.h-4.w-4.cursor-pointer > svg';
        const element5 = await waitForElementBySelector(element5Selector);
        console.log('找到元素5，准备点击');
        await delay(randomDelay(500, 1500));

        // 修正点击 SVG 元素的方法
        const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        element5.dispatchEvent(clickEvent);
        console.log('已点击元素5');

        // 第八步：点击元素6
        const element6Selector = '#\\:r11\\: > div > div > div.flex.items-center.justify-between > svg';
        const element6 = await waitForElementBySelector(element6Selector);
        console.log('找到元素6，准备点击');
        await delay(randomDelay(500, 1500));

        // 使用同样的方法点击 SVG 元素
        element6.dispatchEvent(clickEvent);
        console.log('已点击元素6');

        // 第九步：点击元素7
        const element7Xpath = '//*[@id="task"]';
        const element7 = await waitForElementByXpath(element7Xpath);
        console.log('找到元素7，准备点击');
        await delay(randomDelay(500, 1500));
        element7.click();
        console.log('已点击元素7');

        // 第十步：点击元素8
        const element8Xpath = '//*[@id="panel:r3:1"]/div/div/div[2]/div/div[2]';
        const element8 = await waitForElementByXpath(element8Xpath);
        console.log('找到元素8，准备点击');
        await delay(randomDelay(500, 1500));
        element8.click();
        console.log('已点击元素8');

        console.log('脚本执行完毕');
    }

    // 页面加载完成后执行主函数
    window.addEventListener('load', function() {
        console.log('页面已加载，等待随机时间后开始执行脚本');
        setTimeout(main, randomDelay(1000, 3000));
    });
})();
