// ==UserScript==
// @name         自动化脚本：Space3、SideQuest、Glob Shaga Quests、Forge.gg、Reddio Points Task 和 XtremeVerse
// @namespace    http://tampermonkey.net/
// @version      1.8.8
// @description  自动化操作 Space3、SideQuest、Glob Shaga Quests、Forge.gg、Reddio Points Task 和 XtremeVerse 页面上的任务
// @author
// @match        https://space3.gg/missions?search=&sort=NEWEST&page=1
// @match        https://sidequest.rcade.game/quests
// @match        https://glob.shaga.xyz/quests*
// @match        https://forge.gg/quests
// @match        https://points.reddio.com/task
// @match        https://xnet.xtremeverse.xyz/earn?index=1
// @match        https://cess.network/merkle/*
// @match        https://*.breadnbutter.fun/*
// @match        https://www.communitygaming.io/quests
// @match        https://pentagon.games/airdrop/ascended
// @updateURL    https://github.com/slatwater/web3-/raw/refs/heads/main/test.user.js
// @downloadURL  https://github.com/slatwater/web3-/raw/refs/heads/main/test.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 版本信息
    const SCRIPT_VERSION = "1.6.8";

    // 日志函数
    function log(message) {
        console.log(`[自动化脚本 v${SCRIPT_VERSION}] ${message}`);
    }

    // 随机延迟函数，返回Promise
    function randomDelay(min = 1000, max = 3000) {
        const delay = Math.floor(Math.random() * (max - min + 1)) + min;
        return new Promise(resolve => setTimeout(resolve, delay));
    }

    // 等待CSS选择器出现
    function waitForSelector(selector, timeout = 30000) {
        return new Promise((resolve, reject) => {
            const interval = 500;
            let elapsed = 0;
            const timer = setInterval(() => {
                const element = document.querySelector(selector);
                if (element) {
                    clearInterval(timer);
                    resolve(element);
                } else {
                    elapsed += interval;
                    if (elapsed >= timeout) {
                        clearInterval(timer);
                        reject(new Error(`等待元素 ${selector} 超时`));
                    }
                }
            }, interval);
        });
    }

    // 等待XPath选择器出现
    function waitForXPath(xpath, timeout = 30000) {
        return new Promise((resolve, reject) => {
            const interval = 500;
            let elapsed = 0;
            const timer = setInterval(() => {
                const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                if (result.singleNodeValue) {
                    clearInterval(timer);
                    resolve(result.singleNodeValue);
                } else {
                    elapsed += interval;
                    if (elapsed >= timeout) {
                        clearInterval(timer);
                        reject(new Error(`等待XPath ${xpath} 超时`));
                    }
                }
            }, interval);
        });
    }

    // 等待元素消失
    function waitForElementToDisappear(selector, timeout = 30000) {
        return new Promise((resolve, reject) => {
            const interval = 500;
            let elapsed = 0;
            const timer = setInterval(() => {
                const element = document.querySelector(selector);
                if (!element) {
                    clearInterval(timer);
                    resolve();
                } else {
                    elapsed += interval;
                    if (elapsed >= timeout) {
                        clearInterval(timer);
                        reject(new Error(`等待元素 ${selector} 消失超时`));
                    }
                }
            }, interval);
        });
    }

    // 等待特定的元素出现并包含指定的文本内容
    function waitForElementWithText(selector, text, timeout = 30000) {
        return new Promise((resolve, reject) => {
            const interval = 500;
            let elapsed = 0;
            const timer = setInterval(() => {
                const elements = document.querySelectorAll(selector);
                for (let element of elements) {
                    if (element.textContent.trim() === text) {
                        clearInterval(timer);
                        resolve(element);
                        return;
                    }
                }
                elapsed += interval;
                if (elapsed >= timeout) {
                    clearInterval(timer);
                    reject(new Error(`等待包含文本 "${text}" 的元素 ${selector} 超时`));
                }
            }, interval);
        });
    }

    // 主函数
    async function main() {
        try {
            log("脚本开始执行，等待页面完全加载...");

            // 根据当前网址选择执行的脚本
            const currentURL = window.location.href;

            if (currentURL.includes('space3.gg/missions')) {
                // 执行脚本1的功能
                await executeScript1();
            } else if (currentURL.includes('sidequest.rcade.game/quests')) {
                // 执行脚本2的功能
                await executeScript2();
            } else if (currentURL.includes('glob.shaga.xyz/quests')) {
                // 执行脚本3的功能
                await executeScript3();
            } else if (currentURL.includes('forge.gg/quests')) {
                // 执行脚本4的功能
                await executeScript4();
            } else if (currentURL.includes('points.reddio.com/task')) {
                // 执行脚本5的功能
                await executeScript5();
            } else if (currentURL.includes('xnet.xtremeverse.xyz/earn')) {
                // 执行脚本6的功能
                await executeScript6();
            } else if (currentURL.includes('cess.network/merkle')) {
                // 执行脚本7的功能
                await executeScript7();
            } else if (currentURL.includes('breadnbutter.fun')) {
                // 执行脚本8的功能
                await executeScript8();
            } else if (currentURL.includes('communitygaming.io/quests')) {
                // 执行脚本9的功能
                await executeScript9();
            } else if (currentURL.includes('pentagon.games/airdrop/ascended')) {
                // 执行脚本10的功能
                await executeScript10();
            } else {
                log("当前页面不在脚本的处理范围内。");
            }

        } catch (error) {
            log(`发生错误: ${error.message}`);
        }
    }

    // 脚本1：Space3 Missions 自动化操作
    async function executeScript1() {
        log("执行Space3 Missions 自动化脚本。");

        const area1Selector = '#daily-checkin-container > div.space-3-row.css-kda75v > div.space-3-col.space-3-col-24.overlay-container.css-kda75v > div';
        // 已删除小窗口1的检测逻辑

        try {
            await waitForSelector(area1Selector);
        } catch (error) {
            log(`未找到区域1，选择器为：${area1Selector}`);
            return;
        }

        await randomDelay(2000, 4000);
        log("页面加载完成，开始执行点击操作。");

        // 获取区域1
        const area1 = document.querySelector(area1Selector);
        if (!area1) {
            log(`未找到区域1，选择器为：${area1Selector}`);
            return;
        }

        // 获取所有符合条件的img元素
        let imgElements = area1.querySelectorAll('img[alt="Daily Reward"].space-3-image-img.checkin-reward-card__contents--thumb.css-kda75v[src="https://psyxmwdgtfwzworjuzqw.supabase.co/storage/v1/object/public/space3/public/41fc685129ab4ca651f337dad12f0dd7a81714a34cd6fa0561f06840d5b5e4d2"]');
        log(`在区域1中找到 ${imgElements.length} 个符合条件的img元素。`);

        for (let i = 0; i < imgElements.length; i++) {
            const img = imgElements[i];
            if (img) {
                log(`点击第 ${i + 1} 个符合条件的img元素。`);
                img.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 确保元素在视野内
                await randomDelay(500, 1500); // 在点击前稍作延迟

                img.click();
                log(`已点击第 ${i + 1} 个img元素`);
                await randomDelay(500,1000 ); // 在点击后稍作延迟

                // 已删除URL变化检测逻辑

                // 随机延迟后继续
                await randomDelay(500, 1000);
            } else {
                log(`第 ${i + 1} 个img元素不存在，跳过。`);
            }
        }

        log("Space3 Missions 自动化脚本执行完毕，已点击所有符合条件的img元素，跳转到 SideQuest 任务页面。");
        await randomDelay(2000, 4000);
        window.location.href = 'https://sidequest.rcade.game/quests';
    }

    // 脚本2：SideQuest 自动化操作
    async function executeScript2() {
        log("执行SideQuest 自动化脚本。");

        const missionListSelector = '#root > div > div > div.main > div.content.undefined > div > div.mission-list';

        try {
            await waitForSelector(missionListSelector);
        } catch (error) {
            log(`未找到任务列表，选择器为：${missionListSelector}`);
            return;
        }

        await randomDelay(2000, 4000);
        log("页面加载完成，开始执行第一步操作。");

        // 步骤一：循环点击任务按钮
        const missionList = document.querySelector(missionListSelector);
        while (true) {
            const buttons = missionList.querySelectorAll('button');
            if (buttons.length === 0) {
                log("区域1中没有更多的button元素，进入第二步。");
                break;
            }

            // 随机选择一个按钮
            const randomIndex = Math.floor(Math.random() * buttons.length);
            const selectedButton = buttons[randomIndex];
            log(`点击区域1中的第 ${randomIndex + 1} 个按钮。`);
            selectedButton.click();

            // 等待小窗口1出现
            const smallWindow1Selector = 'body > div:nth-child(8) > div > div > div > div';
            log("等待小窗口1出现...");
            try {
                await waitForSelector(smallWindow1Selector, 5000);
                log("小窗口1已出现。");
                await randomDelay(1000, 2000);
            } catch (error) {
                log("小窗口1未出现，可能需要重新点击。");
            }

            // 在小窗口1中点击元素1的button子元素
            const element1Selector = 'body > div:nth-child(8) > div > div > div > div > div:nth-child(3) > div > div button';
            log("查找并点击小窗口1中的元素1的button子元素。");
            try {
                const element1Button = await waitForSelector(element1Selector, 10000);
                if (element1Button) {
                    element1Button.click();
                    log("已点击元素1的button子元素，等待其消失...");
                    // 等待元素1的button子元素消失，预计约25秒
                    await waitForElementToDisappear(element1Selector, 30000);
                    log("元素1的button子元素已消失。");
                } else {
                    log("未找到元素1的button子元素。");
                }
            } catch (error) {
                log("未找到元素1的button子元素或点击失败。");
            }

            // 点击小窗口1中的元素2
            const element2Selector = 'body > div:nth-child(8) > div > div > div > div > button > img';
            log("查找并点击小窗口1中的元素2。");
            try {
                const element2 = await waitForSelector(element2Selector, 10000);
                if (element2) {
                    element2.click();
                    log("已点击元素2。");
                } else {
                    log("未找到元素2。");
                }
            } catch (error) {
                log("未找到元素2或点击失败。");
            }

            // 随机延迟后继续循环
            await randomDelay(2000, 4000);
        }

        // 步骤二：点击元素3并处理小窗口2
        const element3Selector = '#root > div > div > div.main > div.content.undefined > div > div.spin-container > div > button';
        log("开始执行第二步，点击元素3。");
        try {
            const element3 = await waitForSelector(element3Selector, 10000);
            if (element3) {
                element3.click();
                log("已点击元素3，等待小窗口2出现。");
            } else {
                log("未找到元素3，无法执行第二步。");
                return;
            }
        } catch (error) {
            log("未找到元素3或点击失败。");
            return;
        }

        // 等待小窗口2出现
        const smallWindow2Selector = 'body > div.ReactModalPortal > div > div > div > div';
        try {
            await waitForSelector(smallWindow2Selector, 10000);
            log("小窗口2已出现。");
            await randomDelay(1000, 2000);
        } catch (error) {
            log("小窗口2未出现。");
        }

        // 点击小窗口2中的元素4
        const element4Selector = 'body > div.ReactModalPortal > div > div > div > div > button.spin-btn';
        log("查找并点击小窗口2中的元素4。");
        try {
            const element4 = await waitForSelector(element4Selector, 10000);
            if (element4) {
                element4.click();
                log("已点击元素4，等待其消失...");
                // 等待元素4消失
                await waitForElementToDisappear(element4Selector, 30000);
                log("元素4已消失。");
            } else {
                log("未找到元素4。");
            }
        } catch (error) {
            log("未找到元素4或点击失败。");
        }

        // 点击小窗口2中的元素5
        const element5Selector = 'body > div.ReactModalPortal > div > div > div > div > button.close-btn > img';
        log("查找并点击小窗口2中的元素5。");
        try {
            const element5 = await waitForSelector(element5Selector, 10000);
            if (element5) {
                element5.click();
                log("已点击元素5。");
            } else {
                log("未找到元素5。");
            }
        } catch (error) {
            log("未找到元素5或点击失败。");
        }

        log("SideQuest 自动化脚本执行完毕，跳转到 Glob Shaga Quests 页面。");
        await randomDelay(2000, 4000);
        window.location.href = 'https://glob.shaga.xyz/quests';
    }

    // 脚本3：Glob Shaga Quests 自动化操作
    async function executeScript3() {
        log("执行 Glob Shaga Quests 自动化脚本。");

        // 元素1：<img src="other/Group 1000004021.png">
        const imgSelector = 'img[src="other/Group 1000004021.png"]';

        // 元素2的XPath
        const element2XPath = '//*[@id="root"]/div/div[1]/main/div[3]/div[2]/div[3]/div[6]/span[2]/span/span';

        // 等待元素1出现
        try {
            const imgElement = await waitForSelector(imgSelector, 20000);
            log(`找到元素1，src="${imgElement.getAttribute('src')}"，准备点击。`);

            // 获取元素1的父级元素（假设是可点击的）
            let clickableElement = imgElement.closest('button, a, div[onclick], span[onclick]');
            if (!clickableElement) {
                // 如果找不到可点击的父级，可以尝试点击img本身
                clickableElement = imgElement;
                log("未找到可点击的父级元素，将直接点击<img>元素。");
            } else {
                log(`找到可点击的父级元素：${clickableElement.tagName}`);
            }

            // 滚动到元素并点击
            clickableElement.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 确保元素在视野内
            await randomDelay(500, 1500); // 在点击前稍作延迟
            clickableElement.click();
            log("已点击元素1，开始监测元素2的出现。");

            // 等待元素2出现
            log(`等待元素2出现，XPath: ${element2XPath}`);
            await waitForXPath(element2XPath, 30000);
            log("Glob Shaga Quests 自动化脚本执行完毕，跳转到 Forge.gg Quests 页面。");
            await randomDelay(2000, 4000);
            window.location.href = 'https://forge.gg/quests';
        } catch (error) {
            log(`未找到元素1或点击失败：${error.message}`);
        }
    }

    // 脚本4：Forge.gg Quests 自动化操作
    async function executeScript4() {
        log("执行 Forge.gg Quests 自动化脚本。");

        // 定义元素选择器
        const element1Selector = '#root > div > div.user__wrapper.bg-quest > main > div.home-topcontent > header > button';
        const element2Selector = '#root > div > div.user__wrapper.bg-quest > main > div.home-topcontent > header > div.home-rewards__head > div > button';
        const spinnerSelector = '#root > div > div.user__wrapper.bg-quest.content-paused > main > div.home-topcontent > header > p > span.spinner';
        const element3Selector = 'div.xpbar.xpbar--badge.margin-bottom';

        // 记录初始的barValue值
        let initialBarValue = null;
        let scriptStopped = false; // 脚本停止标志
        let clickElement2IntervalId = null; // 定时器ID

        // 第一步：重复点击元素1，直到spinner出现
        log("开始点击元素1，直到加载开始（spinner出现）...");
        try {
            let spinnerAppeared = false;
            while (!spinnerAppeared) {
                const element1 = await waitForSelector(element1Selector, 10000);
                await randomDelay(500, 1000);
                element1.click();
                log("已点击元素1。");

                // 检查spinner是否出现
                try {
                    await waitForSelector(spinnerSelector, 2000);
                    log("加载已开始（spinner已出现）。");
                    spinnerAppeared = true;
                } catch (error) {
                    log("spinner未出现，继续点击元素1...");
                }

                // 添加适当的随机延迟
                await randomDelay(1000, 2000);
            }
        } catch (error) {
            log("未找到元素1或点击失败。");
            return;
        }

        // 第二步：等待加载完成（等待spinner消失）
        log("等待加载完成（等待spinner消失）...");
        try {
            await waitForElementToDisappear(spinnerSelector, 30000);
            log("加载已完成。");
        } catch (error) {
            log("等待spinner消失超时或发生错误。");
            return;
        }

        // 第三步：开始监测元素3的barValue值变化
        log("等待元素3加载完毕...");
        try {
            const element3 = await waitForSelector(element3Selector, 20000);
            initialBarValue = getBarValue(element3);
            log(`初始的barValue值为：${initialBarValue}`);

            // 开始监测barValue变化
            observeBarValueChange(element3, (newBarValue) => {
                log(`检测到barValue值变化，新的值为：${newBarValue}`);
                scriptStopped = true; // 设置脚本停止标志
                // 停止点击元素2的定时器
                if (clickElement2IntervalId) {
                    clearInterval(clickElement2IntervalId);
                    log('已停止点击元素2的定时器。');
                }
                // 自动跳转至Reddio Points Task页面
                log("自动跳转至 Reddio Points Task 页面。");
                window.location.href = 'https://points.reddio.com/task';
            });

            // 第四步：点击元素2，并每隔20秒点击一次，直到barValue变化
            await clickElement2Periodically(element2Selector);
        } catch (error) {
            log(`未找到元素3或获取barValue失败：${error.message}`);
            return;
        }

        // 定义辅助函数

        // 获取元素3的barValue值
        function getBarValue(element) {
            const style = element.getAttribute('style');
            const match = /--barValue:\s*([^;]+);/.exec(style);
            if (match && match[1]) {
                return match[1].trim();
            }
            return null;
        }

        // 监测元素3的barValue值变化
        function observeBarValueChange(element, callback) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'style') {
                        const newBarValue = getBarValue(element);
                        if (newBarValue !== initialBarValue) {
                            observer.disconnect(); // 停止观察
                            callback(newBarValue);
                        }
                    }
                });
            });
            observer.observe(element, {
                attributes: true,
                attributeFilter: ['style']
            });
        }

        // 点击元素2，并每隔20秒点击一次，直到barValue变化
        async function clickElement2Periodically(element2Selector) {
            if (scriptStopped) {
                log('barValue值已变化，停止脚本。');
                return;
            }

            try {
                const element2 = await waitForSelector(element2Selector, 20000);
                await randomDelay(500, 1000);
                element2.click();
                log('已点击元素2。');

                // 设置每隔20秒点击一次
                clickElement2IntervalId = setInterval(async () => {
                    if (!scriptStopped) {
                        try {
                            const btn = document.querySelector(element2Selector);
                            if (btn) {
                                btn.click();
                                log('已再次点击元素2。');
                            } else {
                                log("元素2已不存在，停止点击。");
                                clearInterval(clickElement2IntervalId);
                            }
                        } catch (error) {
                            log(`点击元素2时发生错误: ${error.message}`);
                        }
                    } else {
                        log('barValue值已变化，停止点击元素2。');
                        clearInterval(clickElement2IntervalId);
                    }
                }, 20000); // 20秒
            } catch (error) {
                log(`未找到元素2或点击失败：${error.message}`);
            }
        }
    }

    // 脚本5：Reddio Points Task 自动化点击
    async function executeScript5() {
        log("执行 Reddio Points Task 自动化脚本。");

        /**
         * 通过XPath获取元素
         * @param {string} xpath 元素的XPath路径
         * @returns {HTMLElement|null} 返回找到的元素或null
         */
        function getElementByXPath(xpath) {
            return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        }

        /**
         * 点击指定的元素并记录日志
         * @param {HTMLElement} element 要点击的元素
         * @param {string} description 元素的描述信息
         * @returns {Promise<boolean>} 返回点击是否成功
         */
        async function clickElement(element, description) {
            if (element) {
                try {
                    element.click();
                    log(`✔️ 成功点击 ${description}`);
                    return true;
                } catch (error) {
                    log(`❌ 点击 ${description} 失败: ${error.message}`);
                    return false;
                }
            } else {
                log(`⚠️ ${description} 不存在`);
                return false;
            }
        }

        /**
         * 等待页面完全加载
         * @returns {Promise} 页面加载完成的Promise
         */
        async function waitForPageLoad() {
            return new Promise((resolve) => {
                if (document.readyState === 'complete') {
                    resolve();
                } else {
                    window.addEventListener('load', () => resolve());
                }
            });
        }

        /**
         * 主函数，执行自动点击操作
         */
        async function mainReddio() {
            log(`🔧 Tampermonkey脚本版本 ${SCRIPT_VERSION} 已启动`);

            // 等待页面加载完成
            await waitForPageLoad();
            log('✅ 页面已完全加载');

            // 随机延迟1-3秒后开始执行
            const initialDelay = Math.floor(Math.random() * 2000) + 1000;
            log(`⏳ 等待 ${initialDelay} 毫秒后开始执行脚本`);
            await new Promise(resolve => setTimeout(resolve, initialDelay));

            // 定义元素1的XPath
            const element1XPath = '/html/body/div[1]/main/div/div[8]/div/div[2]/div[1]/button';
            const element1 = getElementByXPath(element1XPath);

            if (element1) {
                log('🔍 找到元素1，准备点击');
                const clicked = await clickElement(element1, '元素1');
                if (clicked) {
                    log('🎉 元素1已成功点击，准备执行后续操作');
                }
            } else {
                log('❌ 未找到元素1，脚本执行结束');
            }
        }

        // 执行脚本5的主函数
        await mainReddio();

        // 在Reddio脚本执行完毕后，自动跳转至XtremeVerse目标网址
        log("Reddio脚本执行完毕，准备跳转至 XtremeVerse 页面。");
        await randomDelay(2000, 4000);
        window.location.href = 'https://xnet.xtremeverse.xyz/earn?index=1';
    }

    // 脚本6：XtremeVerse 自动化操作
    async function executeScript6() {
        log("执行 XtremeVerse 自动化脚本。");

        // 通过XPath获取元素
        function getElementByXPath(xpath, context = document) {
            return document.evaluate(xpath, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        }

        // 等待页面完全加载并设置随机延迟
        async function waitForPageLoad() {
            return new Promise((resolve) => {
                if (document.readyState === 'complete') {
                    resolve();
                } else {
                    window.addEventListener('load', () => {
                        resolve();
                    });
                }
            });
        }

        // 等待元素出现
        async function waitForElement(selector, timeout = 10000) {
            return new Promise((resolve, reject) => {
                const element = document.querySelector(selector);
                if (element) {
                    return resolve(element);
                }

                const observer = new MutationObserver(() => {
                    const el = document.querySelector(selector);
                    if (el) {
                        observer.disconnect();
                        resolve(el);
                    }
                });

                observer.observe(document.body, { childList: true, subtree: true });

                setTimeout(() => {
                    observer.disconnect();
                    reject(new Error(`等待元素 ${selector} 超时`));
                }, timeout);
            });
        }

        // 主执行函数
        async function mainXtremeVerse() {
            try {
                log('开始执行脚本，等待页面完全加载...');
                await waitForPageLoad();
                await new Promise(resolve => setTimeout(resolve, randomDelay()));
                log('页面已完全加载，开始执行操作。');

                // 步骤1：点击元素1
                log('步骤1：查找并点击元素1...');
                const element1XPath = '//*[@id="bodyNode"]/div[4]/div[1]/div/div[1]/div[2]/div[2]';
                const element1 = getElementByXPath(element1XPath);
                if (element1) {
                    element1.click();
                    log('步骤1完成。');
                } else {
                    throw new Error(`无法找到元素1，XPath: ${element1XPath}`);
                }

                // 添加随机延迟后执行步骤2
                const delayAfterStep1 = Math.floor(Math.random() * 2000) + 1000; // 1-3秒
                log(`步骤1执行完毕，等待随机延迟 ${delayAfterStep1} 毫秒后执行步骤2。`);
                await new Promise(resolve => setTimeout(resolve, delayAfterStep1));

                // 步骤2：遍历点击区域1中文本为"Verify"的按钮
                log('步骤2：遍历点击区域1中所有"Verify"按钮...');
                const region1Selector = '#bodyNode > div.Box-sc-1rsndmr-0.styles__WrapT-sc-1gtzf12-4.lkoHY.fUbung > div.Box-sc-1rsndmr-0.styles__ZoomContentWrap-sc-1gtzf12-6.lkoHY.foLijU > div > div.airdrop__AirDropContentContainer-sc-4wk6us-0.jFBdMN > div > div > div:nth-child(2) > div:nth-child(2)';

                while (true) {
                    const region1 = document.querySelector(region1Selector);
                    if (!region1) {
                        throw new Error(`无法找到区域1，Selector: ${region1Selector}`);
                    }

                    // 修改选择器以匹配具有特定类名且文本为"Verify"的<div>元素
                    const verifyButtons = Array.from(region1.querySelectorAll('div.SocialFarming__FarmButton-sc-neia86-8.kJBPou'))
                        .filter(div => div.textContent.trim() === 'Verify');

                    if (verifyButtons.length === 0) {
                        log('区域1中已无"Verify"按钮。');
                        break;
                    }

                    for (let btn of verifyButtons) {
                        log('准备点击一个"Verify"按钮。');
                        // 滚动到元素并点击
                        btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        await randomDelay(500, 1500); // 在点击前稍作延迟

                        // 点击按钮
                        btn.click();
                        log('已点击一个"Verify"按钮。');
                        await randomDelay(500, 1000); // 在点击后稍作延迟
                    }

                    // 随机延迟后继续循环
                    await randomDelay(2000, 4000);
                }

                // 步骤3：点击元素2
                log('步骤3：查找并点击元素2...');
                const element2XPath = '//*[@id="bodyNode"]/div[4]/div[1]/div/div[2]/div/div/div[2]/div[2]/div[2]/div/div/div/div[3]/div';
                const element2 = getElementByXPath(element2XPath);
                if (element2) {
                    element2.click();
                    log('步骤3完成。');
                } else {
                    throw new Error(`无法找到元素2，XPath: ${element2XPath}`);
                }
                await new Promise(resolve => setTimeout(resolve, randomDelay()));

                // 步骤4：等待对话框出现
                log('步骤4：等待对话框出现...');
                const dialogSelector = 'div[id^="dialog-"]:not([aria-hidden="true"])'; // 选择当前可见的dialog
                const dialog = await waitForElement(dialogSelector, 10000);
                log('对话框已出现。');

                // 添加额外的延迟，确保元素3已加载
                const extraDelay = Math.floor(Math.random() * 2000) + 1000; // 1到3秒的额外延迟
                log(`等待额外的 ${extraDelay} 毫秒，以确保元素3已加载。`);
                await new Promise(resolve => setTimeout(resolve, extraDelay));

                // 定位元素3的更新后的XPath
                const element3XPath = '//*[@id="dialog-:r0:"]/div/div/div/div/div/div[3]/div[1]/div/button/span';
                log('步骤4：查找并点击元素3...');

                while (true) {
                    // 确保对话框仍然存在
                    const currentDialog = document.querySelector(dialogSelector);
                    if (!currentDialog) {
                        log('对话框已关闭，脚本执行完毕。');
                        break;
                    }

                    // 查找元素3的<span>元素
                    const element3Span = getElementByXPath(element3XPath);
                    if (element3Span) {
                        // 找到<span>的父<button>元素
                        const button = element3Span.closest('button');
                        if (button) {
                            log('准备点击元素3的<button>元素。');
                            button.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 确保元素在视野内
                            await randomDelay(500, 1500); // 在点击前稍作延迟
                            button.click();
                            log('点击了元素3。');
                            await new Promise(resolve => setTimeout(resolve, randomDelay()));
                        } else {
                            log('未找到元素3的可点击父元素（button）。');
                            break;
                        }
                    } else {
                        log('元素3已不存在。');
                        break;
                    }
                }

                log('XtremeVerse 自动化脚本执行完毕，脚本结束。');

                // 在XtremeVerse脚本执行完毕后，自动跳转至CESS目标网址
                log("XtremeVerse脚本执行完毕，准备跳转至 CESS Network Merkle 页面。");
                await randomDelay(2000, 4000);
                window.location.href = 'https://cess.network/merkle/?oauth_token=Vo-FrQAAAAABvy-VAAABkdpcgpc&oauth_verifier=UmMyKT2yJtnvZmgOX5rFIO2L6x9bSxAy';


            } catch (error) {
                log(`错误：${error}`);
            }
        }

        // 执行主函数
        await mainXtremeVerse();
    }

    // 脚本7：CESS Network Merkle 自动化操作
    async function executeScript7() {
        log("执行 CESS Network Merkle 自动化脚本。");

        // 等待XPath选择器出现
        function waitForXPath(xpath, timeout = 30000) {
            return new Promise((resolve, reject) => {
                const interval = 500;
                let elapsed = 0;
                const timer = setInterval(() => {
                    const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                    if (result.singleNodeValue) {
                        clearInterval(timer);
                        resolve(result.singleNodeValue);
                    } else {
                        elapsed += interval;
                        if (elapsed >= timeout) {
                            clearInterval(timer);
                            reject(new Error(`等待XPath ${xpath} 超时`));
                        }
                    }
                }, interval);
            });
        }

        try {
            // 设置随机延迟
            await randomDelay(3000, 6000);

            // 点击元素1
            const element1XPath = '//*[@id="root"]/div/div/div[3]/div[2]/div/div/div/div[3]/div[2]/button';
            log('查找元素1并点击...');
            const element1 = await waitForXPath(element1XPath);
            element1.click();
            log('已点击元素1。');

            // 设置随机延迟
            await randomDelay(1000, 2000);

            // 点击元素2
            const element2XPath = '/html/body/div[2]/div/div[2]/div/div[2]/div[2]/div/div/div[2]/div[1]/button';
            log('查找元素2并点击...');
            const element2 = await waitForXPath(element2XPath);
            element2.click();
            log('已点击元素2。');

            // 等待元素4出现并点击
            const element4XPath = '/html/body/div[3]/div/div[2]/div/div[2]/div/div/div[2]/button[2]';
            log('等待元素4出现...');
            const element4 = await waitForXPath(element4XPath);
            await randomDelay(500, 1000);
            element4.click();
            log('已点击元素4。');

            // 设置随机延迟
            await randomDelay(1000, 2000);

            // 点击元素3
            const element3XPath = '/html/body/div[2]/div/div[2]/div/div[2]/div[2]/div/div/div[2]/div[2]/button';
            log('查找元素3并点击...');
            const element3 = await waitForXPath(element3XPath);
            element3.click();
            log('已点击元素3。');

            // 等待元素4出现并点击
            log('等待元素4再次出现...');
            const element4_2 = await waitForXPath(element4XPath);
            await randomDelay(500, 1000);
            element4_2.click();
            log('已再次点击元素4。');

            // 设置随机延迟
            await randomDelay(1000, 2000);

            // 点击元素5
            const element5XPath = '/html/body/div[2]/div/div[2]/div/div[2]/div[2]/div/div/button';
            log('查找元素5并点击...');
            const element5 = await waitForXPath(element5XPath);
            element5.click();
            log('已点击元素5。');

            // 设置随机延迟
            await randomDelay(1000, 2000);

            // 点击元素6 (canvas)
            const element6XPath = '/html/body/div[2]/div/div[2]/div/div[2]/div[2]/div/div/div[2]/div/canvas';
            log('查找元素6（canvas）并点击...');
            const element6 = await waitForXPath(element6XPath);

            // 获取canvas的中心坐标
            const rect = element6.getBoundingClientRect();
            const canvasX = rect.left + rect.width / 2;
            const canvasY = rect.top + rect.height / 2;

            // 创建并派发鼠标事件
            function simulateClick(x, y) {
                const evt = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                    clientX: x,
                    clientY: y
                });
                element6.dispatchEvent(evt);
            }

            simulateClick(canvasX, canvasY);
            log('已模拟点击元素6（canvas）。');

            // 设置随机延迟
            await randomDelay(1000, 2000);

            // 等待元素7出现并点击
            const element7XPath = '/html/body/div[3]/div/div[2]/div/div[2]/div/div/div[2]/button';
            log('等待元素7出现...');
            const element7 = await waitForXPath(element7XPath);
            await randomDelay(500, 1000);
            element7.click();
            log('已点击元素7。');

            log('CESS Network Merkle 自动化脚本执行完毕，脚本结束。');
            // 自动跳转至 breadnbutter.fun 页面
            log("XtremeVerse 脚本执行完毕，准备跳转至 BreadnButter 页面。");
            await randomDelay(2000, 4000);
            window.location.href = 'https://m.breadnbutter.fun/task';

        } catch (error) {
            log(`发生错误: ${error.message}`);
        }
    }
    // 脚本8：BreadnButter 自动化操作
    async function executeScript8() {
        log("执行 BreadnButter 自动化脚本。");

        // 定义元素的XPath
        const element1Xpath = '//*[@id="root"]/div/div/div/div/div[1]/div/div/div/div[2]/div[2]/div[1]/div[1]/div[2]/button/div';
        const element2Xpath = '//*[@id="root"]/div/div/div/div/div[3]/div[1]/div[2]/div[3]/div/div';
        const element3Xpath = '//*[@id="root"]/div/div[2]/div[1]/div[2]/div[1]/div/div/div/div[2]';
        const element4Xpath = '//*[@id="root"]/div/div[2]/div[4]/div[2]/div[9]/div/div/div/div[2]';
        const element5Xpath = '//*[@id="root"]/div/div[2]/div[4]/div[2]/div[8]/div/div/div/div[1]/div[2]/span';
        const element6Xpath = '//*[@id="root"]/div/div[2]/div[4]/div[2]/div[8]/div/div/div/div[2]';

        // 检查元素1是否存在
        try {
            const element1 = await waitForXPath(element1Xpath, 10000);

            if (element1) {
                log('元素1存在，开始点击元素1');
                // 点击元素1
                element1.click();

                // 设置随机延迟，然后等待元素2出现
                const delay = Math.floor(Math.random() * 2000) + 1000;
                log(`等待 ${delay} 毫秒后，等待元素2出现并点击`);
                await randomDelay(delay, delay + 500); // 1-1.5秒

                try {
                    const element2 = await waitForXPath(element2Xpath, 10000);
                    log('元素2已出现，点击元素2');
                    element2.click();

                    // 随机延迟后，进行第二步
                    const delayStep2 = Math.floor(Math.random() * 2000) + 1000;
                    log(`等待 ${delayStep2} 毫秒后，开始执行第二步`);
                    await randomDelay(delayStep2, delayStep2 + 500); // 1-1.5秒

                    await secondStep(element3Xpath, element4Xpath, element5Xpath, element6Xpath);
                } catch (error) {
                    log('元素2未出现，直接进行第二步');
                    await secondStep(element3Xpath, element4Xpath, element5Xpath, element6Xpath);
                }
            } else {
                log('元素1不存在，直接进行第二步');
                await secondStep(element3Xpath, element4Xpath, element5Xpath, element6Xpath);
            }
        } catch (error) {
            log('元素1不存在，直接进行第二步');
            await secondStep(element3Xpath, element4Xpath, element5Xpath, element6Xpath);
        }

        // 不在这里执行重定向
    }

    // 第二步函数
    async function secondStep(element3Xpath, element4Xpath, element5Xpath, element6Xpath) {
        log('开始执行第二步');
        try {
            const element3 = await waitForXPath(element3Xpath, 10000);
            log('点击元素3');
            element3.click();
            log('已点击元素3');

            const delay = Math.floor(Math.random() * 2000) + 1000;
            log(`等待 ${delay} 毫秒后，点击元素4`);
            await randomDelay(delay, delay + 500); // 1-1.5秒

            const element4 = await waitForXPath(element4Xpath, 10000);
            log('点击元素4');
            element4.click();
            log('已点击元素4');

            const delay2 = Math.floor(Math.random() * 2000) + 1000;
            log(`等待 ${delay2} 毫秒后，点击元素5`);
            await randomDelay(delay2, delay2 + 500); // 1-1.5秒

            const element5 = await waitForXPath(element5Xpath, 10000);
            log('点击元素5，等待12秒钟');
            element5.click();
            await new Promise(resolve => setTimeout(resolve, 12000)); // 等待12秒

            const element6 = await waitForXPath(element6Xpath, 10000);
            log('点击元素6，脚本执行完毕');
            element6.click();
            log('已点击元素6，脚本执行完毕');

            // 确保点击元素6后完成所有操作，再进行重定向
            log("所有 BreadnButter 操作已完成，准备跳转至 CommunityGaming 页面。");
            await randomDelay(2000, 4000); // 延迟2-4秒
            log("即将跳转至 CommunityGaming 页面。");
            try {
                // 动态创建并点击带有 target="_top" 的链接，强制整个窗口导航到目标URL
                let link = document.createElement('a');
                link.href = 'https://www.communitygaming.io/quests';
                link.target = '_top';
                link.style.display = 'none'; // 隐藏链接
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                log("已执行重定向。"); // 这条日志可能无法看到，因为页面已跳转
            } catch (error) {
                log(`重定向时发生错误：${error.message}`);
            }
        } catch (error) {
            log(`执行第二步时发生错误：${error.message}`);
        }
    }


    // 脚本9：CommunityGaming Quests 自动化操作
    async function executeScript9() {
        log("执行 CommunityGaming Quests 自动化脚本。");

        // 版本标记
        const SCRIPT2_VERSION = '1.7.6';

        // 随机延迟函数，返回Promise
        function randomDelayScript2(min = 500, max = 1500) {
            const delay = Math.floor(Math.random() * (max - min + 1)) + min;
            return new Promise(resolve => setTimeout(resolve, delay));
        }

        // 固定延迟函数，返回Promise
        function fixedDelayScript2(ms = 2000) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        // 使用XPath获取单个元素
        function getElementByXPathScript2(xpath, context = document) {
            return document.evaluate(xpath, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        }

        // 使用XPath获取所有匹配的元素
        function getAllElementsByXPathScript2(xpath, context = document) {
            const result = [];
            const nodesSnapshot = document.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for (let i = 0; i < nodesSnapshot.snapshotLength; i++) {
                result.push(nodesSnapshot.snapshotItem(i));
            }
            return result;
        }

        // 使用CSS选择器获取单个元素
        function getElementBySelectorScript2(selector) {
            return document.querySelector(selector);
        }

        // 日志输出
        function logScript2(message) {
            console.log(`%c[脚本 v${SCRIPT2_VERSION}] ${message}`, 'color: green; font-weight: bold;');
        }

        // 等待元素出现
        function waitForElementScript2(selectorOrXPath, type = 'selector', timeout = 20000, context = document) { // 增加了超时时间
            return new Promise((resolve, reject) => {
                const intervalTime = 500;
                let elapsed = 0;

                const interval = setInterval(() => {
                    let element;
                    if (type === 'selector') {
                        element = getElementBySelectorScript2(selectorOrXPath);
                    } else if (type === 'xpath') {
                        element = getElementByXPathScript2(selectorOrXPath, context);
                    }

                    if (element) {
                        clearInterval(interval);
                        resolve(element);
                    } else {
                        elapsed += intervalTime;
                        if (elapsed >= timeout) {
                            clearInterval(interval);
                            reject(new Error(`等待元素超时: ${selectorOrXPath}`));
                        }
                    }
                }, intervalTime);
            });
        }

        // 主异步函数
        async function mainCommunityGaming() {
            try {
                logScript2('脚本开始执行，等待页面完全加载...');
                await randomDelayScript2(2000, 4000); // 增加初始等待时间确保页面加载

                // 步骤1：遍历点击元素1
                logScript2('开始执行步骤1：遍历并点击元素1');

                // 元素1的XPath：查找所有包含特定文本的div，并获取其父按钮
                const element1XPath = "//div[contains(@class, 'd-flex') and contains(@class, 'align-items-center') and normalize-space(text())='LIKE & REPOST']/ancestor::button[1]";
                const element1Buttons = getAllElementsByXPathScript2(element1XPath);

                logScript2(`在页面中找到 ${element1Buttons.length} 个元素1`);

                if (element1Buttons.length === 0) {
                    logScript2('未找到任何元素1，跳过步骤1');
                } else {
                    for (let i = 0; i < element1Buttons.length; i++) {
                        const elem1Button = element1Buttons[i];
                        logScript2(`点击元素1 (${i + 1}/${element1Buttons.length})`);
                        elem1Button.click();
                        await randomDelayScript2();

                        // 等待小窗口1出现
                        logScript2('等待小窗口1出现...');
                        try {
                            const smallWindow1 = await waitForElementScript2('#ActivityModal > div > div', 'selector', 10000);
                            logScript2('小窗口1已出现，开始延迟1-2秒后点击元素2');

                            // 延迟1-2秒
                            await randomDelayScript2(2000, 2500);
                            logScript2('延迟完成，点击小窗口1中的元素2');

                            // 元素2的XPath
                            const elem2XPath = '/html/body/div[4]/div/div/div/div[4]/button[2]';
                            const elem2 = getElementByXPathScript2(elem2XPath);
                            if (elem2) {
                                elem2.click();
                                logScript2('已点击小窗口1中的元素2');
                                await randomDelayScript2();
                            } else {
                                logScript2('未找到小窗口1中的元素2');
                                continue;
                            }
                        } catch (error) {
                            logScript2(error.message);
                            continue;
                        }

                        // 等待小窗口2出现
                        logScript2('等待小窗口2出现...');
                        try {
                            const smallWindow2 = await waitForElementScript2('#ModalXPCompletedXpedition > div > div', 'selector', 20000); // 增加等待时间
                            logScript2('小窗口2已出现，等待3秒后继续下一个元素');

                            // 等待3秒
                            await new Promise(resolve => setTimeout(resolve, 3000));
                        } catch (error) {
                            logScript2(error.message);
                            continue;
                        }

                        logScript2(`已完成元素1 (${i + 1}/${element1Buttons.length}) 的点击流程`);
                        await randomDelayScript2(); // 随机延迟后继续下一个元素
                    }
                }

                // 步骤2：持续点击元素4
                logScript2('开始执行步骤2：持续点击元素4，直到小窗口3出现');
                let continueClicking = true;

                // 设置一个监听器来监控小窗口3的出现
                const observer = new MutationObserver((mutations, obs) => {
                    const smallWindow3 = getElementBySelectorScript2('#ModalXPSpin > div > div');
                    if (smallWindow3) {
                        logScript2('小窗口3已出现，停止点击');
                        continueClicking = false;
                        obs.disconnect();
                    }
                });

                observer.observe(document.body, { childList: true, subtree: true });

                while (continueClicking) {
                    // 更新后的元素4的XPath
                    const elem4XPath = "/html/body/div[1]/main/div[3]/div/div[3]/div[2]/div[2]/div[1]/div[2]/div[2]/button";
                    const elem4Button = getElementByXPathScript2(elem4XPath);
                    if (elem4Button) {
                        logScript2('点击元素4');
                        elem4Button.click();
                    } else {
                        logScript2('未找到元素4，停止点击');
                        break;
                    }
                    await fixedDelayScript2(1000); // 设置固定1秒的间隔
                }

                // 等待2秒后结束脚本
                logScript2('等待2秒后结束脚本');
                await new Promise(resolve => setTimeout(resolve, 2000));
                logScript2('脚本执行完毕');
                // 在CommunityGaming脚本执行完毕后，自动跳转至 Pentagon Games 目标网址
                log("CommunityGaming 脚本执行完毕，准备跳转至 Pentagon Games 空投页面。");
                await randomDelay(2000, 4000); // 延迟2-4秒
                window.location.href = 'https://pentagon.games/airdrop/ascended';

            } catch (error) {
                logScript2(`脚本执行出错: ${error.message}`);
            }
        }

        // 主异步函数执行
        await mainCommunityGaming();

        // 在CommunityGaming脚本执行完毕后，自动结束脚本或执行其他操作
        log("CommunityGaming 脚本执行完毕，脚本结束。");
    }

    // 脚本10：Pentagon Games Airdrop 自动化操作
    async function executeScript10() {
        log("执行Pentagon Games Airdrop Automation脚本。");
    
        try {
            console.log(`[%s] 脚本开始执行`, new Date().toLocaleString());
    
            // 确保页面完全加载
            await waitForPageLoad();
    
            // 第一步
            await stepOnePentagon();
    
            // 第二步
            await stepTwoPentagon();
    
            console.log(`[%s] 脚本执行完毕`, new Date().toLocaleString());
    
        } catch (error) {
            log(`发生错误: ${error.message}`);
        }
    
        // 在Pentagon脚本执行完毕后，可以选择结束脚本或执行其他操作
        // 如果需要自动刷新或其他行为，可以在这里添加
    }
    
    // 第一步操作 for Pentagon Games
    async function stepOnePentagon() {
        console.log(`[%s] 开始执行第一步（Pentagon）`, new Date().toLocaleString());
    
        const element1 = getElementByXpath('/html/body/main/div[1]/header/div/div/a[2]/button');
        if (element1) {
            console.log(`[%s] 发现元素1，准备点击`, new Date().toLocaleString());
            const clickSuccess1 = await clickElement(element1, '元素1');
            if (!clickSuccess1) return;
    
            const element2 = getElementByXpath('/html/body/main/div[2]/div/div/div/form/div[3]/input');
            if (element2) {
                console.log(`[%s] 发现元素2，准备点击`, new Date().toLocaleString());
                const clickSuccess2 = await clickElement(element2, '元素2');
                if (!clickSuccess2) return;
            } else {
                console.log(`[%s] 未找到元素2，跳过`, new Date().toLocaleString());
            }
    
            const element3 = getElementByXpath('/html/body/main/div[1]/header/div/div/div/a[2]/label');
            if (element3) {
                console.log(`[%s] 发现元素3，准备点击`, new Date().toLocaleString());
                const clickSuccess3 = await clickElement(element3, '元素3');
                if (!clickSuccess3) return;
            } else {
                console.log(`[%s] 未找到元素3，跳过`, new Date().toLocaleString());
            }
    
            const element4 = getElementByXpath('//*[@id="airdrop"]/div/div[1]/a/button');
            if (element4) {
                console.log(`[%s] 发现元素4，准备点击`, new Date().toLocaleString());
                const clickSuccess4 = await clickElement(element4, '元素4');
                if (!clickSuccess4) return;
            } else {
                console.log(`[%s] 未找到元素4，跳过`, new Date().toLocaleString());
            }
    
            const element5 = getElementByXpath('/html/body/main/div[2]/div[2]/div/img');
            if (element5) {
                console.log(`[%s] 发现元素5，准备点击`, new Date().toLocaleString());
                const clickSuccess5 = await clickElement(element5, '元素5');
                if (!clickSuccess5) return;
            } else {
                console.log(`[%s] 未找到元素5，跳过`, new Date().toLocaleString());
            }
    
            const element6 = getElementByXpath('/html/body/main/div[2]/div[3]/div/div/div[7]/div/div/div[2]/a/button');
            if (element6) {
                console.log(`[%s] 发现元素6，准备点击`, new Date().toLocaleString());
                const clickSuccess6 = await clickElement(element6, '元素6');
                if (!clickSuccess6) return;
            } else {
                console.log(`[%s] 未找到元素6，跳过`, new Date().toLocaleString());
            }
        } else {
            console.log(`[%s] 未找到元素1，跳过第一步`, new Date().toLocaleString());
        }
    
        console.log(`[%s] 第一部完成，进入第二步`, new Date().toLocaleString());
    }
    
    // 第二步操作 for Pentagon Games
    async function stepTwoPentagon() {
        console.log(`[%s] 开始执行第二步（Pentagon）`, new Date().toLocaleString());
    
        const element7 = getElementByXpath('/html/body/main/div[2]/div/div[2]/div[2]/img');
        if (element7) {
            console.log(`[%s] 发现元素7，准备点击`, new Date().toLocaleString());
            const clickSuccess7 = await clickElement(element7, '元素7');
            if (!clickSuccess7) return;
        } else {
            console.log(`[%s] 未找到元素7，无法执行第二步`, new Date().toLocaleString());
            return;
        }
    
        const element8Xpath = '/html/body/div[2]/div/div/div/div[2]/div/div/div/div[2]/div/div/canvas';
        const smallWindowXpath = '//*[@id="headlessui-dialog-panel-:r1:"]/div/div[2]/div/div/label';
    
        console.log(`[%s] 开始持续点击元素8，直到小窗口1出现`, new Date().toLocaleString());
    
        // 持续点击元素8，直到小窗口1出现
        const maxAttempts = 100; // 最大尝试次数，防止无限循环
        let attempts = 0;
    
        while (attempts < maxAttempts) {
            const smallWindow = getElementByXpath(smallWindowXpath);
            if (smallWindow) {
                console.log(`[%s] 发现小窗口1，结束脚本`, new Date().toLocaleString());
                break;
            }
    
            const element8 = getElementByXpath(element8Xpath);
            if (element8) {
                console.log(`[%s] 尝试点击元素8（转盘）`, new Date().toLocaleString());
                const clickSuccess8 = await simulateClick(element8, '元素8');
                if (!clickSuccess8) {
                    console.log(`[%s] 点击元素8失败，尝试重新点击`, new Date().toLocaleString());
                } else {
                    console.log(`[%s] 成功点击元素8`, new Date().toLocaleString());
                }
            } else {
                console.log(`[%s] 未找到元素8，等待下一次尝试`, new Date().toLocaleString());
            }
    
            attempts++;
            await randomDelay(500, 1000); // 每次点击后延迟
        }
    
        if (attempts >= maxAttempts) {
            console.log(`[%s] 达到最大尝试次数，脚本结束`, new Date().toLocaleString());
        }
    }

    // 等待页面完全加载后执行主函数
    window.addEventListener('load', async () => {
        // 随机延迟后开始执行
        const initialDelay = Math.floor(Math.random() * 3000) + 3000; // 3-6秒
        log(`页面加载完成，等待 ${initialDelay} 毫秒后开始执行脚本。`);
        await new Promise(resolve => setTimeout(resolve, initialDelay));
        main();
    });

})();
