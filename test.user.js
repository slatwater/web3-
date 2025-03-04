// ==UserScript==
// @name         自动化脚本：Space3、SideQuest、Glob Shaga Quests、Forge.gg、Reddio Points Task 和 XtremeVerse
// @namespace    http://tampermonkey.net/
// @version      10.8
// @description  自动化操作 Space3、SideQuest、Glob Shaga Quests、Forge.gg、Reddio Points Task 和 XtremeVerse 页面上的任务
// @author
// @match        https://space3.gg/missions?search=&sort=NEWEST&page=1
// @match        https://glob.shaga.xyz/main
// @match        https://sidequest.rcade.game/quests
// @match        https://forge.gg/quests
// @match        https://xnet.xtremeverse.xyz/earn?index=1
// @match        https://cess.network/deshareairdrop/*
// @match        https://quest.redactedairways.com/*
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

    // 固定延迟函数
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
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
            } else if (currentURL.includes('glob.shaga.xyz/main')) {
                // 执行脚本2的功能
                await executeScript2();
            } else if (currentURL.includes('sidequest.rcade.game/quests')) {
                // 执行脚本3的功能
                await executeScript3();
            } else if (currentURL.includes('forge.gg/quests')) {
                // 执行脚本4的功能
                await executeScript4();
            } else if (currentURL.includes('xnet.xtremeverse.xyz/earn')) {
                // 执行脚本6的功能
                await executeScript6();
            } else if (currentURL.includes('cess.network/deshareairdrop')) {
                // 执行脚本7的功能
                await executeScript7();  
            } else if (currentURL.includes('quest.redactedairways.com')) {
                // 执行脚本12的功能
                await executeScript12();   
            } else {
                log("当前页面不在脚本的处理范围内。");
            }

        } catch (error) {
            log(`发生错误: ${error.message}`);
        }
    }

    // 脚本1：Space3 Missions 自动化操作 
    async function executeScript1() {
        log("执行 Space3 Missions 自动化脚本。");
    
        const area1Selector = '#daily-checkin-container > div.space-3-row.css-kda75v > div.space-3-col.space-3-col-24.overlay-container.css-kda75v > div';
    
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
    
        // 调用新的点击函数
        await clickAllMatchingElements();
    
        log("Space3 Missions 自动化脚本执行完毕，已点击所有符合条件的元素，跳转到 SideQuest 任务页面。");
        await randomDelay(2000, 4000);
        window.location.href = 'https://glob.shaga.xyz/main';
    }
    
    // 遍历点击所有指定 class 的元素
    async function clickAllMatchingElements() {
        const targetRange = document.evaluate('//*[@id="daily-checkin-container"]/div[1]/div[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (targetRange) {
            log('找到目标区域。');
            const matchingElements = targetRange.querySelectorAll('.space-3-image-img.checkin-reward-card__contents--thumb.css-kda75v');
    
            if (matchingElements.length > 0) {
                log(`找到 ${matchingElements.length} 个匹配的元素，依次点击...`);
    
                for (let i = 0; i < matchingElements.length; i++) {
                    const element = matchingElements[i];
    
                    // 使用 async/await 和延迟函数
                    await (async () => {
                        // 确保元素可见
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
                        // 等待随机延迟
                        await randomDelay(1000, 2000);
    
                        // 尝试直接点击元素
                        log(`正在点击第 ${i + 1} 个元素...`);
                        element.click();
    
                        log(`已点击第 ${i + 1} 个元素。`);
                    })();
                }
            } else {
                log('未找到匹配的元素。');
            }
        } else {
            log('未找到目标区域。');
        }
    }
    
    // 脚本2：Glob Shaga Quests 自动化操作（单次点击SPIN按钮）
    async function executeScript2() {
        log("执行 Glob Shaga Quests 自动化脚本。");

        const spinButtonSelector = 'button.rounded-md.shadow-sm:contains("SPIN")';

        // 自定义:contains选择器
        function containsSelector(selector, text) {
            return Array.from(document.querySelectorAll(selector)).find(element => 
                element.textContent.trim().toUpperCase() === text.toUpperCase()
            );
        }

        // 判断元素是否可点击
        function isElementClickable(element) {
            if (!element) {
                log('[Shaga Spin] [调试] 元素不存在');
                return false;
            }
            const style = window.getComputedStyle(element);
            if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0' || element.disabled) {
                log('[Shaga Spin] [调试] 元素不可点击 - display:', style.display, 'visibility:', style.visibility, 'opacity:', style.opacity, 'disabled:', element.disabled);
                return false;
            }
            log('[Shaga Spin] [调试] 元素可点击');
            return true;
        }

        // 等待元素出现
        async function waitForElement(selector, text, timeout = 30000) {
            log(`[Shaga Spin] [调试] 等待元素: ${selector} 包含文本 "${text}"`);
            const startTime = Date.now();
            while (Date.now() - startTime < timeout) {
                const element = containsSelector(selector, text);
                log('[Shaga Spin] [调试] 当前查找结果:', element ? element.outerHTML : '未找到');
                if (element && isElementClickable(element)) {
                    return element;
                }
                await delay(500);
            }
            log('[Shaga Spin] [调试] 等待超时，未找到可点击元素');
            return null;
        }

        // 等待SPIN按钮出现并点击一次
        const spinButton = await waitForElement('button.rounded-md.shadow-sm', 'SPIN', 30000);
        if (spinButton) {
            spinButton.click();
            log('[Shaga Spin] SPIN按钮已点击一次，脚本结束');
        } else {
            log('[Shaga Spin] 未找到SPIN按钮或按钮不可点击，脚本结束');
        }
        log("自动化脚本执行完毕，跳转到 SideQuest 页面。");
        await randomDelay(3000, 5000);
        window.location.href = 'https://sidequest.rcade.game/quests'; 
    }


    // 脚本3：SideQuest 自动化操作
    async function executeScript3() {
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
            const element1Selector = 'body > div:nth-child(8) > div > div > div > div > div:nth-child(3) > div > div > div.btn-container > button';
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

        log("SideQuest 自动化脚本执行完毕，跳转到 Forge.gg Quests 页面。");
        await randomDelay(2000, 4000);
        window.location.href = 'https://forge.gg/quests';
    }

    // 脚本4：Forge.gg Quests 自动化操作（修改版）
    
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
                if (document.querySelector(spinnerSelector)) {
                    log("加载已开始（spinner已出现）。");
                    spinnerAppeared = true;
                } else {
                    log("spinner未出现，继续点击元素1...");
                }
    
                // 添加适当的随机延迟
                await randomDelay(1000, 2000);
            }
        } catch (error) {
            log("未找到元素1或点击失败。");
            return;
        }
    
        // 第二步：等待加载完成（持续等待spinner消失）
        log("等待加载完成（持续等待spinner消失）...");
        try {
            await waitForSpinnerToDisappear(spinnerSelector);
            log("加载已完成。");
        } catch (error) {
            log("等待spinner消失时发生错误：" + error.message);
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
                window.location.href = 'https://xnet.xtremeverse.xyz/earn?index=1';
            });
    
            // 第四步：点击元素2，并每隔50秒点击一次，直到barValue变化
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
    
        // 点击元素2，并每隔50秒点击一次，直到barValue变化
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
    
                // 设置每隔50秒点击一次
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
                }, 50000); // 50秒
            } catch (error) {
                log(`未找到元素2或点击失败：${error.message}`);
            }
        }
    
        // 新增持续等待spinner消失的函数
        async function waitForSpinnerToDisappear(selector) {
            while (document.querySelector(selector)) {
                log("spinner仍在，继续等待...");
                await randomDelay(1000, 2000);
            }
        }
    }
    
    // 以下为工具函数，假设在同一脚本文件内已定义
    
    async function waitForSelector(selector, timeout = 10000) {
        const start = Date.now();
        while (Date.now() - start < timeout) {
            const element = document.querySelector(selector);
            if (element) return element;
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        throw new Error(`超时：未能在${timeout}毫秒内找到元素：${selector}`);
    }
    
    async function randomDelay(min, max) {
        const delay = Math.floor(Math.random() * (max - min)) + min;
        return new Promise(resolve => setTimeout(resolve, delay));
    }
    
    function log(message) {
        console.log(`[脚本日志] ${message}`);
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
                const delayAfterStep1 = Math.floor(Math.random() * 2000) + 3000; // 3-5秒
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
                window.location.href = 'https://cess.network/deshareairdrop/';


            } catch (error) {
                log(`错误：${error}`);
            }
        }

        // 执行主函数
        await mainXtremeVerse();
    }

    // 替换后的 executeScript7（基于脚本2）
    async function executeScript7() {
        // 内部定义 waitForElement 函数
        async function waitForElement(selector, textContent, timeout = 10000) {
            return new Promise((resolve, reject) => {
                const interval = 500;
                let elapsed = 0;
                const timer = setInterval(() => {
                    const elements = document.querySelectorAll(selector);
                    let targetElement = null;

                    if (textContent) {
                        elements.forEach(el => {
                            if (el.textContent.trim() === textContent) {
                                targetElement = el;
                            }
                        });
                    } else {
                        targetElement = elements[0];
                    }

                    if (targetElement) {
                        clearInterval(timer);
                        resolve(targetElement);
                        return;
                    }

                    elapsed += interval;
                    if (elapsed >= timeout) {
                        clearInterval(timer);
                        reject(new Error(`元素 ${selector}${textContent ? ` with text "${textContent}"` : ''} 未在 ${timeout}ms 内找到`));
                    }
                }, interval);
            });
        }

        try {
            // 等待网页完全加载
            log("等待网页完全加载...");
            await new Promise(resolve => {
                if (document.readyState === "complete") {
                    resolve();
                } else {
                    window.addEventListener("load", resolve);
                }
            });
            await randomDelay(2000, 5000); // 初始随机延迟 2-5 秒

            // 第一步：点击 Check-in 按钮
            log("寻找 Check-in 按钮...");
            const checkInButton = await waitForElement('button.bg-primary', 'Check-in');
            log("点击 Check-in 按钮...");
            checkInButton.click();
            await randomDelay(1000, 3000); // 随机延迟 1-3 秒

            // 第二步：点击 Retweet 按钮
            log("寻找 Retweet 按钮...");
            const retweetButton = await waitForElement('button.bg-primary', 'Retweet');
            log("点击 Retweet 按钮...");
            retweetButton.click();
            await randomDelay(3000, 3000); // 固定 3 秒延迟（按脚本2需求）

            // 第三步：点击 Forwarded & Get Points 按钮
            log("寻找 Forwarded & Get Points 按钮...");
            const forwardButton = await waitForElement('button.bg-primary', 'Forwarded & Get Points');
            log("点击 Forwarded & Get Points 按钮...");
            forwardButton.click();

            log("所有操作执行完毕！");
        } catch (error) {
            log(`发生错误：${error.message}`);
        }
        log("CESS 自动化脚本执行完毕，跳转到 RED 页面。");
        await randomDelay(2000, 4000);
        window.location.href = 'https://quest.redactedairways.com/';
    }

    // 脚本12：Redacted Airways Quests 自动化操作
    async function executeScript12() {
        log('执行 Redacted Airways Quests 自动化脚本');

        // 主函数逻辑

        // 区域1的选择器
        const area1Selector = '#social-quests > section:nth-child(1) > div.max-h-\\[320px\\].md\\:max-h-\\[260px\\].desktop\\:max-h-\\[340px\\].overflow-auto.md\\:max-w-\\[720px\\].desktop\\:max-w-\\[950px\\].mt-4.w-full.mx-auto > div > div:nth-child(1)';

        // 等待区域1出现
        let area1;
        try {
            area1 = await waitForSelector(area1Selector, 10000);
            log('区域1已找到');
        } catch (error) {
            log('未找到区域1，脚本结束');
            return;
        }

        // 定义循环执行的函数
        async function executeSteps() {
            while (true) {
                // 第一步：检查判断属性是否为0
                const attributeElement = area1.querySelector('span.text-primary');
                if (attributeElement && attributeElement.textContent.trim() === '0') {
                    log('判断属性为0，脚本结束');
                    break;
                } else {
                    log('判断属性不为0，开始执行第二步');

                    // 第二步：点击区域1中的元素1
                    const buttons = area1.querySelectorAll('button');
                    let foundButton = false;
                    for (let button of buttons) {
                        const buttonText = button.textContent.replace(/\s+/g, '').toLowerCase();
                        if (['like', 'retweet', 'follow', 'continue'].includes(buttonText)) {
                            // 确保按钮可见
                            button.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            // 等待一下
                            await delay(500);
                            // 使用更可靠的点击方法
                            button.focus();
                            button.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
                            log(`已点击按钮：${button.textContent.trim()}`);
                            foundButton = true;
                            break;
                        }
                    }

                    if (!foundButton) {
                        log('未找到匹配的按钮，等待2秒后重试');
                        await delay(2000);
                        continue;
                    }

                    // 监测小窗口1的出现并处理
                    await handlePopup();

                    // 随机延迟1-2秒后继续下一次循环
                    log('等待 1-2 秒后继续');
                    await randomDelay(1000, 2000);
                }
            }
        }

        // 处理小窗口1的函数
        async function handlePopup() {
            const popupXpath = '//*[@id="root"]/div/div[2]/div/div[4]/div';

            try {
                // 等待小窗口1出现
                let popup = await waitForXPath(popupXpath, 10000);
                log('小窗口1已出现');

                // 持续监测并点击小窗口1中的元素1
                while (true) {
                    // 重新获取 popup 元素，防止内容变化导致引用失效
                    popup = document.evaluate(popupXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    if (!popup) {
                        log('小窗口1已消失');
                        break;
                    }

                    const popupButtons = popup.querySelectorAll('button');
                    let foundPopupButton = false;
                    for (let button of popupButtons) {
                        const buttonText = button.textContent.replace(/\s+/g, '').toLowerCase();
                        if (['like', 'retweet', 'follow', 'continue'].includes(buttonText)) {
                            // 确保按钮可见
                            button.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            // 等待一下
                            await delay(500);
                            // 使用更可靠的点击方法
                            button.focus();
                            button.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
                            log(`已点击小窗口中的按钮：${button.textContent.trim()}`);
                            foundPopupButton = true;
                            // 等待一下以便处理后续动作
                            await delay(1000);
                            break;
                        }
                    }

                    if (!foundPopupButton) {
                        log('未找到小窗口中的匹配按钮，等待1秒后重试');
                        await delay(1000);
                    }
                }

            } catch (error) {
                log('未检测到小窗口1');
            }
        }

        // 开始执行步骤
        await executeSteps();

        log('Redacted Airways Quests 自动化脚本已完成');
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
