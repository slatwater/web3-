// ==UserScript==
// @name         自动化脚本：Avalon、Shaga、SideQuest、Forge、XtremeVerse、Mahojin、Magic Newton、Beamable、Talus、Bithub、KlokApp
// @namespace    http://tampermonkey.net/
// @version      5.5
// @description  自动化操作 Avalon、Shaga、SideQuest、Forge、XtremeVerse、Mahojin、Magic Newton、Beamable、Talus、Bithub 和 KlokApp 页面上的任务
// @author       Grok 3 by xAI
// @match        https://quests.avalon.online/*
// @match        https://glob.shaga.xyz/main
// @match        https://sidequest.rcade.game/*
// @match        https://forge.gg/quests
// @match        https://xnet.xtremeverse.xyz/earn?index=1
// @match        https://app.mahojin.ai/my/point
// @match        https://www.magicnewton.com/portal/rewards
// @match        https://hub.beamable.network/modules/*
// @match        https://hub.talus.network/loyalty
// @match        https://bithub.77-bit.com/*
// @match        https://klokapp.ai/*
// @updateURL    https://github.com/slatwater/web3-/raw/refs/heads/main/test.user.js
// @downloadURL  https://github.com/slatwater/web3-/raw/refs/heads/main/test.user.js
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';

    // 日志输出函数（统一日志格式）
    function log(message) {
        console.log(`[自动化脚本 v5.3] ${message}`);
    }

    // 随机延迟函数（ms）
    function randomDelay(min, max) {
        const delay = Math.floor(Math.random() * (max - min + 1)) + min;
        return new Promise(resolve => setTimeout(resolve, delay));
    }

    // 等待网页加载完成
    function waitForPageLoad() {
        return new Promise(resolve => {
            if (document.readyState === 'complete') resolve();
            else window.addEventListener('load', resolve);
        });
    }

    // 等待元素出现（支持上下文）
    async function waitForSelector(selector, timeout = 20000, context = document) {
        const start = Date.now();
        while (Date.now() - start < timeout) {
            const element = context.querySelector(selector);
            if (element) return element;
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        throw new Error(`超时：未能在${timeout}ms内找到元素：${selector}`);
    }

    // 模拟真实点击
    function simulateClick(element) {
        const clickEvent = new Event('click', { bubbles: true, cancelable: true });
        element.dispatchEvent(clickEvent);
    }

    // 主函数
    async function main() {
        log('脚本启动，等待页面加载...');
        log('确认脚本版本：v5.3');
        await waitForPageLoad();
        await randomDelay(1000, 3000);

        const currentURL = window.location.href;
        log(`当前页面URL: ${currentURL}`);
        try {
            if (currentURL.includes('quests.avalon.online')) await executeScript0();
            else if (currentURL.includes('glob.shaga.xyz/main')) await executeScript2();
            else if (currentURL.includes('sidequest.rcade.game')) await executeScript3();
            else if (currentURL.includes('forge.gg/quests')) await executeScript4();
            else if (currentURL.includes('xnet.xtremeverse.xyz/earn')) await executeScript6();
            else if (currentURL.includes('app.mahojin.ai/my/point')) await executeScript12();
            else if (currentURL.includes('www.magicnewton.com/portal/rewards')) await executeScript11();
            else if (currentURL.includes('hub.beamable.network/modules')) await executeScript7();
            else if (currentURL.includes('hub.talus.network/loyalty')) await executeScript10();
            else if (currentURL.includes('bithub.77-bit.com')) await executeScript9();
            else if (currentURL.includes('klokapp.ai')) await executeScript8();
            else log('当前页面不在脚本处理范围内。');
        } catch (error) {
            log(`脚本执行出错: ${error.message}`);
        }
    }

    // 脚本0：Avalon Quests 自动化操作
    async function executeScript0() {
        log('执行 Avalon Quests 自动化脚本...');
        const maxWaitTime = 20000;
        const startTime = Date.now();
        let buttonFound = false;

        while (Date.now() - startTime < maxWaitTime && !buttonFound) {
            const collectButton = document.querySelector('button.inline-flex.text-white.border-hyperBlue');
            if (collectButton && collectButton.textContent.trim() === 'Collect') {
                log('找到Collect按钮，准备点击...');
                await randomDelay(500, 1500);
                collectButton.click();
                log('Collect按钮已点击，跳转至 Shaga 页面。');
                buttonFound = true;
                await randomDelay(10000, 15000);
                window.location.href = 'https://glob.shaga.xyz/main';
            } else {
                log('未找到Collect按钮，继续等待...');
                await randomDelay(1000, 2000);
            }
        }

        if (!buttonFound) {
            log('20秒超时，未找到Collect按钮，跳转至 Shaga 页面...');
            await randomDelay(5000, 10000);
            window.location.href = 'https://glob.shaga.xyz/main';
        }
    }

    // 脚本2：Glob Shaga Quests 自动化操作
    async function executeScript2() {
        log('执行 Glob Shaga Quests 自动化脚本...');
        const spinButtonSelector = 'button.rounded-md.shadow-sm';

        const spinButton = await new Promise(resolve => {
            const timer = setInterval(() => {
                const btn = Array.from(document.querySelectorAll(spinButtonSelector))
                    .find(el => el.textContent.trim().toUpperCase() === 'SPIN' && !el.disabled);
                if (btn) {
                    clearInterval(timer);
                    resolve(btn);
                }
            }, 500);
            setTimeout(() => { clearInterval(timer); resolve(null); }, 30000);
        });

        if (spinButton) {
            await randomDelay(500, 1500);
            spinButton.click();
            log('SPIN按钮已点击，跳转至 SideQuest 页面。');
        } else {
            log('未找到SPIN按钮或不可点击，跳转至 SideQuest 页面。');
        }
        await randomDelay(5000, 10000);
        window.location.href = 'https://sidequest.rcade.game/quests';
    }

    // 脚本3：SideQuest 自动化操作
    async function executeScript3() {
        log('执行 SideQuest 自动化脚本...');

        const missionListSelector = '#root > div > div > div.main > div.content.undefined > div > div.mission-list';
        let missionList;
        try {
            missionList = await waitForSelector(missionListSelector);
        } catch (error) {
            log(`任务列表未找到: ${error.message}，跳转至 Forge.gg 页面`);
            await randomDelay(5000, 10000);
            window.location.href = 'https://forge.gg/quests';
            return;
        }

        while (true) {
            const buttons = missionList.querySelectorAll('button');
            if (buttons.length === 0) {
                log('任务列表中无按钮，进入第二步...');
                break;
            }

            const randomIndex = Math.floor(Math.random() * buttons.length);
            const selectedButton = buttons[randomIndex];
            log(`点击任务按钮 ${randomIndex + 1}...`);
            simulateClick(selectedButton);

            async function findSmallWindow1(timeout = 10000) {
                const startTime = Date.now();
                while (Date.now() - startTime < timeout) {
                    const potentialWindows = document.querySelectorAll('body > div');
                    for (const div of potentialWindows) {
                        const buttonContainer = div.querySelector('div > div > div.btn-container > button');
                        if (buttonContainer) {
                            log('动态定位到小窗口1');
                            return div;
                        }
                    }
                    for (const div of potentialWindows) {
                        const anyButton = div.querySelector('button:not([disabled])');
                        if (anyButton && div.style.display !== 'none') {
                            log('使用备用定位找到小窗口1');
                            return div;
                        }
                    }
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
                throw new Error('未找到小窗口1');
            }

            try {
                const smallWindow1 = await findSmallWindow1(10000);
                log('小窗口1已出现。');
                await randomDelay(1000, 2000);

                const element1Selector = 'div.btn-container > button';
                const element1Button = await waitForSelector(element1Selector, 10000, smallWindow1);
                log(`找到小窗口1中的按钮: ${element1Button.textContent.trim()}`);
                simulateClick(element1Button);
                log('点击小窗口1中的按钮，等待消失...');
                await new Promise(resolve => {
                    const check = setInterval(() => {
                        if (!smallWindow1.querySelector(element1Selector)) {
                            clearInterval(check);
                            resolve();
                        }
                    }, 500);
                    setTimeout(() => { clearInterval(check); resolve(); }, 30000);
                });

                const closeButtonSelector = 'button.close-btn, button > img, button[aria-label="close"], button svg';
                const closeButton = await waitForSelector(closeButtonSelector, 10000, smallWindow1);
                log(`找到小窗口1中的关闭按钮: ${closeButton.outerHTML}`);
                simulateClick(closeButton);
                log('点击小窗口1中的关闭按钮。');

                await randomDelay(500, 1500);
            } catch (error) {
                log(`小窗口1处理失败: ${error.message}，延迟后继续循环...`);
                await randomDelay(2000, 4000);
            }
            await randomDelay(2000, 4000);
        }

        const element3Selector = '#root > div > div > div.main > div.content.undefined > div > div.spin-container > div > button';
        try {
            const element3 = await waitForSelector(element3Selector, 10000);
            simulateClick(element3);
            log('点击Spin按钮，等待小窗口2...');

            const smallWindow2Selector = 'body > div:nth-child(8) > div > div > div > div';
            await waitForSelector(smallWindow2Selector, 10000);
            const element4Selector = `${smallWindow2Selector} > button.spin-btn`;
            const element4 = await waitForSelector(element4Selector, 10000);
            simulateClick(element4);
            log('点击小窗口2中的Spin按钮，等待消失...');
            await new Promise(resolve => {
                const check = setInterval(() => {
                    if (!document.querySelector(element4Selector)) {
                        clearInterval(check);
                        resolve();
                    }
                }, 500);
                setTimeout(() => { clearInterval(check); resolve(); }, 30000);
            });

            const element5Selector = `${smallWindow2Selector} > button.close-btn > img`;
            const element5 = await waitForSelector(element5Selector, 10000);
            simulateClick(element5);
            log('关闭小窗口2。');
        } catch (error) {
            log(`小窗口2处理失败: ${error.message}，继续执行...`);
        }

        log('SideQuest 脚本执行完毕，跳转至 Forge.gg 页面。');
        await randomDelay(5000, 10000);
        window.location.href = 'https://forge.gg/quests';
    }

    // 脚本4：Forge.gg Quests 自动化操作
    async function executeScript4() {
        log('执行 Forge.gg Quests 自动化脚本...');
        const element1Selector = '#root > div > div.user__wrapper.bg-quest > main > div.home-topcontent > header > button';
        const spinnerSelector = '#root > div > div.user__wrapper.bg-quest.content-paused > main > div.home-topcontent > header > p > span.spinner';

        while (!document.querySelector(spinnerSelector)) {
            const element1 = await waitForSelector(element1Selector, 10000);
            await randomDelay(500, 1000);
            element1.click();
            log('点击元素1，等待加载...');
            await randomDelay(1000, 2000);
        }

        log('加载开始，等待spinner消失...');
        await new Promise(resolve => {
            const check = setInterval(() => {
                if (!document.querySelector(spinnerSelector)) {
                    clearInterval(check);
                    resolve();
                }
            }, 1000);
        });

        const element3Selector = 'div.xpbar.xpbar--badge.margin-bottom';
        const element3 = await waitForSelector(element3Selector, 20000);
        const initialBarValue = element3.style.getPropertyValue('--barValue') || '0';
        log(`初始barValue: ${initialBarValue}`);

        const element2Selector = '#root > div > div.user__wrapper.bg-quest > main > div.home-topcontent > header > div.home-rewards__head > div > button';
        const element2 = await waitForSelector(element2Selector, 20000);
        element2.click();
        log('首次点击元素2。');

        const intervalId = setInterval(async () => {
            if (document.querySelector(element2Selector)) {
                document.querySelector(element2Selector).click();
                log('定期点击元素2。');
            }
        }, 50000);

        await new Promise(resolve => {
            const observer = new MutationObserver(() => {
                const newBarValue = element3.style.getPropertyValue('--barValue') || '0';
                if (newBarValue !== initialBarValue) {
                    observer.disconnect();
                    clearInterval(intervalId);
                    resolve();
                }
            });
            observer.observe(element3, { attributes: true, attributeFilter: ['style'] });
        });

        log('barValue已变化，跳转至 XtremeVerse 页面。');
        await randomDelay(5000, 10000);
        window.location.href = 'https://xnet.xtremeverse.xyz/earn?index=1';
    }

    // 脚本6：XtremeVerse 自动化操作
    async function executeScript6() {
        log('执行 XtremeVerse 自动化脚本...');

        // 点击元素1
        const element1XPath = '//*[@id="bodyNode"]/div[3]/div[1]/div/div[1]/div[2]/div[2]';
        const element1 = document.evaluate(element1XPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element1) {
            element1.click();
            log('点击元素1。');
        } else {
            log('未找到元素1，跳过点击。');
        }

        await randomDelay(3000, 5000);

        // 定位区域1
        const region1Selector = '#bodyNode > div.Box-sc-1rsndmr-0.styles__WrapT-sc-1gtzf12-4.cOTPbW.fUbung > div.Box-sc-1rsndmr-0.styles__ZoomContentWrap-sc-1gtzf12-6.cOTPbW.foLijU > div > div.airdrop__AirDropContentContainer-sc-4wk6us-0.jFBdMN > div > div > div:nth-child(2) > div:nth-child(2)';
        let region1;
        try {
            region1 = await waitForSelector(region1Selector);
            log('成功定位到区域1。');
        } catch (error) {
            log(`未找到区域1: ${error.message}，继续执行后续步骤。`);
            region1 = null;
        }

        // 检查并处理 Verify 按钮
        if (region1) {
            const verifyButtons = Array.from(region1.querySelectorAll('div.SocialFarming__FarmButton-sc-neia86-8.kJBPou'))
                .filter(div => div.textContent.trim() === 'Verify');
            
            if (verifyButtons.length > 0) {
                log(`找到 ${verifyButtons.length} 个 Verify 按钮，开始遍历点击。`);
                for (const btn of verifyButtons) {
                    btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    await randomDelay(500, 1500);
                    btn.click();
                    log('点击一个 Verify 按钮。');
                    await randomDelay(500, 1000);
                }
            } else {
                log('未找到 Verify 按钮，跳过遍历，直接执行后续步骤。');
            }
        } else {
            log('区域1不可用，跳过 Verify 按钮处理。');
        }

        await randomDelay(2000, 4000);

        // 点击元素2
        const element2XPath = '//*[@id="bodyNode"]/div[3]/div[1]/div/div[2]/div/div/div[2]/div[2]/div[2]/div/div/div/div[3]/div';
        const element2 = document.evaluate(element2XPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element2) {
            element2.click();
            log('点击元素2。');
        } else {
            log('未找到元素2，跳过点击。');
        }

        await randomDelay(1000, 3000);

        // 处理对话框中的元素3
        const dialogSelector = '#dialog-\\:r0\\: > div > div > div > div > div';
        let dialog;
        try {
            dialog = await waitForSelector(dialogSelector, 10000);
            log('对话框已出现。');
        } catch (error) {
            log(`对话框等待失败: ${error.message}，继续执行...`);
        }

        if (dialog) {
            const element3XPath = '//*[@id="dialog-:r0:"]/div/div/div/div/div/div[3]/div[1]/div/button/span';
            while (true) {
                const element3Span = document.evaluate(element3XPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                if (!element3Span || !document.querySelector(dialogSelector)) {
                    log('对话框中元素3处理完毕或对话框已关闭。');
                    break;
                }
                const button = element3Span.closest('button');
                if (button) {
                    button.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    await randomDelay(500, 1500);
                    button.click();
                    log('点击元素3。');
                    await randomDelay(1000, 2000);
                }
            }
        } else {
            log('未找到对话框，跳过元素3处理。');
        }

        log('XtremeVerse 脚本执行完毕，跳转至 Mahojin Point 页面。');
        await randomDelay(5000, 10000);
        window.location.href = 'https://app.mahojin.ai/my/point';
    }

    // 脚本12：Mahojin Point 自动化操作
    async function executeScript12() {
        log('执行 Mahojin Point 自动化脚本...');

        // 等待元素出现（支持CSS选择器）
        async function waitForElement(selector, timeout = 20000) {
            const start = Date.now();
            while (Date.now() - start < timeout) {
                const element = document.querySelector(selector);
                if (element && element.offsetParent !== null && getComputedStyle(element).display !== 'none') {
                    log(`找到可见元素：${selector}`);
                    return element;
                }
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            log(`未能在${timeout}ms内找到可见元素：${selector}`);
            return null;
        }

        // 点击元素并验证成功的函数
        async function clickElement(element, description) {
            if (element) {
                element.click(); // 使用原生 click() 方法
                log(`${description} 已触发点击`);
                await randomDelay(500, 1000); // 短暂延迟以确保页面响应
                const stillVisible = document.querySelector(element.tagName + '[class="' + element.className + '"]');
                if (!stillVisible || stillVisible.offsetParent === null) {
                    log(`${description} 点击后元素状态已变化，点击可能成功`);
                } else {
                    log(`${description} 点击后元素仍可见，可能未响应`);
                }
            } else {
                log(`${description} 未找到`);
            }
        }

        try {
            log("等待页面完全加载...");
            await waitForPageLoad();
            await randomDelay(2000, 5000); // 等待2-5秒确保页面稳定

            const element1Selector = 'body > div.flex.h-full.flex-col.items-stretch > div.flex.flex-row.items-stretch > div.relative.flex.grow.flex-col.items-center.justify-stretch.overflow-hidden > div.relative.flex.w-full.flex-1.grow.flex-col.justify-between.p-6 > div > div.flex.flex-col.items-stretch.md\\:on-mypage.md\\:relative.md\\:h-full.md\\:flex-1.md\\:overflow-y-auto > div > div > div > div.flex.w-full.flex-col.items-stretch.justify-stretch.gap-4.md\\:flex-row > div.flex.flex-col.items-stretch.shrink-0.grow-0.basis-\\[calc\\(50\\%-8px\\)\\].gap-2 > div:nth-child(2) > div.flex.flex-col.items-stretch.gap-4 > div:nth-child(1) > button';

            log("等待元素1出现...");
            const element1 = await waitForElement(element1Selector);
            await clickElement(element1, "元素1");

            log('Mahojin Point 脚本执行完毕，跳转至 Magic Newton 页面。');
            await randomDelay(5000, 10000);
            window.location.href = 'https://www.magicnewton.com/portal/rewards';
        } catch (error) {
            log(`Mahojin Point 脚本执行出错: ${error.message}，尝试跳转至 Magic Newton 页面`);
            await randomDelay(5000, 10000);
            window.location.href = 'https://www.magicnewton.com/portal/rewards';
        }
    }

    // 脚本11：Magic Newton Rewards 自动化操作
    async function executeScript11() {
        log('执行 Magic Newton Rewards 自动化脚本...');

        // 等待元素出现（支持CSS选择器）
        async function waitForElement(selector, timeout = 20000) {
            const start = Date.now();
            while (Date.now() - start < timeout) {
                const element = document.querySelector(selector);
                if (element && element.offsetParent !== null && getComputedStyle(element).display !== 'none') {
                    log(`找到可见元素：${selector}`);
                    return element;
                }
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            log(`未能在${timeout}ms内找到可见元素：${selector}`);
            return null;
        }

        // 点击元素并验证成功的函数
        async function clickElement(element, description) {
            if (element) {
                element.click();
                log(`${description} 已触发点击`);
                await randomDelay(500, 1000);
                const stillVisible = document.querySelector(element.tagName + '[class="' + element.className + '"]');
                if (!stillVisible || stillVisible.offsetParent === null) {
                    log(`${description} 点击后元素状态已变化，点击可能成功`);
                } else {
                    log(`${description} 点击后元素仍可见，可能未响应`);
                }
            } else {
                log(`${description} 未找到`);
            }
        }

        try {
            log("等待页面完全加载...");
            await waitForPageLoad();
            await randomDelay(2000, 5000);

            const element1Selector = 'body > div.dMMuNs.kcKISj > div.fPSBzf.bYPztT.dKLBtz.iRgpoQ.container-page-loaded > div.fPSBzf.container-content > div:nth-child(2) > div > div.fPSBzf.hlUslA.jSqJiD.dMMuNs.oBvEG.dOouYe.fJVVlQ.dNTNvO.Axhdq.dnRKzu.frIWUH.dFrlbO.ksdoCR.jvYutH > div > div > button > div > p';
            const element2Selector = 'body > div.dMMuNs.kcKISj > div.fPSBzf.bYPztT.dKLBtz.iRgpoQ.container-page-loaded > div.fPSBzf.container-content > div > div:nth-child(1) > div.jsx-f1b6ce0373f41d79.info-tooltip-control > button > div > p';
            const element3Selector = 'body > div.dMMuNs.kcKISj > div.fPSBzf.bYPztT.dKLBtz.iRgpoQ.container-page-loaded > div.fPSBzf.container-content > div > div.jsx-f1b6ce0373f41d79.info-tooltip-control > button > div > p';

            log("等待元素1出现...");
            const element1 = await waitForElement(element1Selector);
            await clickElement(element1, "元素1");

            log("等待元素2出现...");
            const element2 = await waitForElement(element2Selector);
            await clickElement(element2, "元素2");

            log("等待元素3出现...");
            const element3 = await waitForElement(element3Selector);
            await clickElement(element3, "元素3");

            log('Magic Newton 脚本执行完毕，跳转至 Beamable Hub 页面。');
            await randomDelay(5000, 10000);
            window.location.href = 'https://hub.beamable.network/modules/questsold';
        } catch (error) {
            log(`Magic Newton 脚本执行出错: ${error.message}，尝试跳转至 Beamable Hub 页面`);
            await randomDelay(5000, 10000);
            window.location.href = 'https://hub.beamable.network/modules/questsold';
        }
    }

    // 脚本7：Beamable Hub 自动化操作
    async function executeScript7() {
        log('执行 Beamable Hub 自动化脚本...');

        // Beamable专用的等待元素可见函数
        const waitForVisibleElement = (selector, timeout = 60000, retries = 5) => {
            return new Promise((resolve) => {
                let attempt = 0;
                const checkElement = () => {
                    const element = document.querySelector(selector);
                    if (element && element.isConnected && (element.offsetParent !== null || getComputedStyle(element).display !== 'none')) {
                        observer.disconnect();
                        log(`找到可见元素 ${selector}, 文本: ${element.textContent.trim()}`);
                        resolve(element);
                    } else if (attempt >= retries) {
                        observer.disconnect();
                        log(`元素 ${selector} 在 ${retries} 次重试后仍不可见`);
                        resolve(null);
                    } else {
                        attempt++;
                        log(`等待 ${selector}，第 ${attempt} 次重试`);
                        setTimeout(checkElement, 2000);
                    }
                };

                const observer = new MutationObserver(checkElement);
                observer.observe(document.body, { childList: true, subtree: true });
                checkElement();

                setTimeout(() => {
                    observer.disconnect();
                    log(`元素 ${selector} 在 ${timeout}ms 内未找到或不可见`);
                    resolve(null);
                }, timeout);
            });
        };

        // Beamable专用的安全点击函数
        const safeClick = async (element, description, waitSelector = null, maxAttempts = 3) => {
            for (let attempt = 1; attempt <= maxAttempts; attempt++) {
                if (!element || !element.isConnected) {
                    log(`未找到或已断开 ${description} (尝试 ${attempt}/${maxAttempts})`);
                    if (attempt === maxAttempts) {
                        log(`重试次数超过 ${maxAttempts}，跳转至 Talus Loyalty 页面`);
                        window.location.href = 'https://hub.talus.network/loyalty';
                    }
                    return false;
                }

                const isVisible = element.offsetParent !== null && getComputedStyle(element).display !== 'none';
                log(`${description} 可见性检查: display=${getComputedStyle(element).display}, offsetParent=${element.offsetParent !== null}, isConnected=${element.isConnected}`);

                if (isVisible || element.isConnected) {
                    log(`点击 ${description} (尝试 ${attempt}/${maxAttempts})`);
                    element.dispatchEvent(new Event('click', { bubbles: true, cancelable: true }));
                    await randomDelay(3000, 5000);

                    if (waitSelector) {
                        const nextElement = await waitForVisibleElement(waitSelector);
                        if (nextElement) {
                            log(`${description} 点击成功，${waitSelector} 已加载`);
                            return nextElement;
                        } else {
                            log(`${description} 点击后未加载 ${waitSelector} (尝试 ${attempt}/${maxAttempts})`);
                            if (attempt === maxAttempts) {
                                log(`重试次数超过 ${maxAttempts}，跳转至 Talus Loyalty 页面`);
                                window.location.href = 'https://hub.talus.network/loyalty';
                                return null;
                            }
                            await randomDelay(5000, 7000);
                            continue;
                        }
                    }
                    return true;
                } else {
                    log(`不可见 ${description}，尝试等待 (尝试 ${attempt}/${maxAttempts})`);
                    const visibleElement = await waitForVisibleElement('a.h-full.flex.flex-col.justify-between.p-4');
                    if (visibleElement && visibleElement.innerText.includes(element.innerText)) {
                        log(`重新找到并点击 ${description}`);
                        visibleElement.dispatchEvent(new Event('click', { bubbles: true, cancelable: true }));
                        await randomDelay(3000, 5000);
                        if (waitSelector) {
                            const nextElement = await waitForVisibleElement(waitSelector);
                            if (nextElement) {
                                log(`${description} 点击成功，${waitSelector} 已加载`);
                                return nextElement;
                            }
                        }
                        return true;
                    }
                    if (attempt === maxAttempts) {
                        log(`重试次数超过 ${maxAttempts}，跳转至 Talus Loyalty 页面`);
                        window.location.href = 'https://hub.talus.network/loyalty';
                        return false;
                    }
                    await randomDelay(5000, 7000);
                }
            }
            return false;
        };

        // Beamable专用的等待元素列表函数
        const waitForElementList = async (maxWait = 60000) => {
            const startTime = Date.now();
            while (Date.now() - startTime < maxWait) {
                const elements = document.querySelectorAll('a.h-full.flex.flex-col.justify-between.p-4');
                if (elements.length > 0) {
                    log(`元素列表已恢复，找到 ${elements.length} 个元素`);
                    return elements;
                }
                log('元素列表为空，等待恢复...');
                await randomDelay(2000, 4000);
            }
            log(`元素列表在 ${maxWait}ms 内未恢复，退出脚本`);
            return [];
        };

        // 前置步骤：点击元素0
        try {
            const element0Selector = '.transition-all.duration-300.w-full.cursor-pointer.flex.items-center.h-10.min-h-10';
            const potentialElements0 = document.querySelectorAll(element0Selector);
            log(`找到 ${potentialElements0.length} 个潜在元素0`);
            let element0 = Array.from(potentialElements0).find(el => el.textContent.trim().includes('Earn Points'));

            if (!element0) {
                log('未找到包含 "Earn Points" 的元素0，尝试等待');
                element0 = await waitForVisibleElement(element0Selector);
                if (element0 && !element0.textContent.trim().includes('Earn Points')) {
                    log('找到元素0，但文本不包含 "Earn Points"');
                    element0 = null;
                }
            }

            if (element0) {
                await safeClick(element0, '元素0');
                await randomDelay(1500, 3000);
            } else {
                log('最终未找到包含 "Earn Points" 的元素0，继续执行后续步骤');
                await randomDelay(1500, 3000);
            }
        } catch (e) {
            log(`点击元素0出错: ${e.message}`);
            await randomDelay(1500, 3000);
        }

        // 第一步：处理元素1和元素1-1
        try {
            const element1Selector = '.transition-all.duration-300.w-full.cursor-pointer.flex.items-center.h-10.min-h-10';
            const potentialElements1 = document.querySelectorAll(element1Selector);
            log(`找到 ${potentialElements1.length} 个潜在元素1`);
            let element1 = null;
            for (const el of potentialElements1) {
                const text = el.textContent.trim();
                log(`检查元素1候选: ${text}`);
                if (text === 'Board') {
                    element1 = el;
                    break;
                }
            }

            if (!element1) {
                log('未找到文本为 "Board" 的元素1，尝试等待');
                element1 = await waitForVisibleElement(element1Selector);
                if (element1 && element1.textContent.trim() !== 'Board') {
                    log('找到元素1，但文本不是 "Board"');
                    element1 = null;
                }
            }

            if (!element1) throw new Error('元素1 未找到');
            await safeClick(element1, '元素1');
            await randomDelay(5000, 7000);

            let elementList = await waitForElementList();
            log(`找到 ${elementList.length} 个元素1-1`);

            for (let i = 0; i < elementList.length; i++) {
                elementList = await waitForElementList();
                if (i >= elementList.length) {
                    log('元素列表已耗尽，退出循环');
                    break;
                }

                const element = elementList[i];
                const innerText = element.innerText.trim();
                log(`元素内容: ${innerText}`);

                const claimedStatus = element.querySelector('span.p3')?.textContent.trim() === 'Claimed';
                const claimableStatus = innerText.includes('Claimable') || element.querySelector('button')?.textContent.includes('Claimable') || element.querySelector('.claimable');
                const taskDescription = element.querySelector('.h3.line-clamp-3')?.textContent.trim() || '未知任务';

                if (claimedStatus) {
                    log(`跳过已领取元素: ${taskDescription}`);
                    continue;
                }

                if (claimableStatus) {
                    log(`检测到Claimable状态: ${taskDescription}`);
                    const clicked = await safeClick(element, `Claimable元素: ${taskDescription}`,
                        '#moduleGriddedContainer > div > div.flex.flex-col.gap-4 > div.lg\\:h-full.flex.flex-col.xl\\:flex-row.gap-2.sm\\:gap-4.lg\\:gap-8 > div.bg-content.flex.flex-col.py-4.px-6.gap-6.sm\\:gap-8.h3.xl\\:w-1\\/2 > div.flex.flex-col.gap-6.sm\\:gap-8.lg\\:gap-6.false > button');
                    if (!clicked) continue;

                    const element1_2 = await waitForVisibleElement('#moduleGriddedContainer > div > div.flex.flex-col.gap-4 > div.lg\\:h-full.flex.flex-col.xl\\:flex-row.gap-2.sm\\:gap-4.lg\\:gap-8 > div.bg-content.flex.flex-col.py-4.px-6.gap-6.sm\\:gap-8.h3.xl\\:w-1\\/2 > div.flex.flex-col.gap-6.sm\\:gap-8.lg\\:gap-6.false > button');
                    if (!element1_2) continue;
                    const clicked1_2 = await safeClick(element1_2, '元素1-2',
                        'div.w-full > button');
                    if (!clicked1_2) continue;

                    const element1_3 = await waitForVisibleElement('div.w-full > button');
                    if (!element1_3) continue;
                    const clicked1_3 = await safeClick(element1_3, '元素1-3');
                    if (!clicked1_3) continue;

                    const element1_4 = await waitForVisibleElement('#moduleGriddedContainer > div > div.xl\\:col-span-2.flex.justify-between.items-center > a');
                    if (!element1_4) continue;
                    await safeClick(element1_4, '元素1-4');
                } else {
                    log(`检测到无状态: ${taskDescription}`);
                    const clicked = await safeClick(element, `无状态元素: ${taskDescription}`,
                        '#moduleGriddedContainer > div > div.flex.flex-col.gap-4 > div.lg\\:h-full.flex.flex-col.xl\\:flex-row.gap-2.sm\\:gap-4.lg\\:gap-8 > div.bg-content.flex.flex-col.py-4.px-6.gap-6.sm\\:gap-8.h3.xl\\:w-1\\/2 > div.flex.flex-col.gap-6.sm\\:gap-8.lg\\:gap-6.false > div > div > div:nth-child(2) > a');
                    if (!clicked) continue;

                    const element1_5 = await waitForVisibleElement('#moduleGriddedContainer > div > div.flex.flex-col.gap-4 > div.lg\\:h-full.flex.flex-col.xl\\:flex-row.gap-2.sm\\:gap-4.lg\\:gap-8 > div.bg-content.flex.flex-col.py-4.px-6.gap-6.sm\\:gap-8.h3.xl\\:w-1\\/2 > div.flex.flex-col.gap-6.sm\\:gap-8.lg\\:gap-6.false > div > div > div:nth-child(2) > a');
                    if (!element1_5) continue;
                    const clicked1_5 = await safeClick(element1_5, '元素1-5');
                    if (!clicked1_5) continue;

                    const element1_4 = await waitForVisibleElement('#moduleGriddedContainer > div > div.xl\\:col-span-2.flex.justify-between.items-center > a');
                    if (!element1_4) continue;
                    await safeClick(element1_4, '元素1-4');
                }
                await randomDelay(5000, 7000);
            }
        } catch (e) {
            log(`第一步出错: ${e.message}`);
        }

        // 第二步：处理元素2和元素2-1
        try {
            const element2Selector = '.transition-all.duration-300.w-full.cursor-pointer.flex.items-center.h-10.min-h-10';
            const potentialElements2 = document.querySelectorAll(element2Selector);
            log(`找到 ${potentialElements2.length} 个潜在元素2`);
            let element2 = null;
            for (const el of potentialElements2) {
                const text = el.textContent.trim();
                log(`检查元素2候选: ${text}`);
                if (text === 'Daily Checkin') {
                    element2 = el;
                    break;
                }
            }

            if (!element2) {
                log('未找到文本为 "Daily Checkin" 的元素2，尝试等待');
                element2 = await waitForVisibleElement(element2Selector);
                if (element2 && element2.textContent.trim() !== 'Daily Checkin') {
                    log('找到元素2，但文本不是 "Daily Checkin"');
                    element2 = null;
                }
            }

            if (!element2) throw new Error('元素2 未找到');
            await safeClick(element2, '元素2');
            await randomDelay(3000, 5000);

            const element2_1Selector = '.flex.items-center.whitespace-break-spaces.transition-all.duration-300.justify-center.gap-2';
            const potentialElements2_1 = document.querySelectorAll(element2_1Selector);
            log(`找到 ${potentialElements2_1.length} 个潜在元素2-1`);
            let element2_1 = null;
            for (const el of potentialElements2_1) {
                const text = el.textContent.trim();
                log(`检查元素2-1候选: ${text}`);
                if (text === 'Claim') {
                    element2_1 = el;
                    break;
                }
            }

            if (!element2_1) {
                log('未找到文本为 "Claim" 的元素2-1，尝试等待');
                element2_1 = await waitForVisibleElement(element2_1Selector);
                if (element2_1 && element2_1.textContent.trim() !== 'Claim') {
                    log('找到元素2-1，但文本不是 "Claim"');
                    element2_1 = null;
                }
            }

            if (element2_1) {
                await safeClick(element2_1, '元素2-1');
            } else {
                log('最终未找到文本为 "Claim" 的元素2-1');
            }
        } catch (e) {
            log(`第二步出错: ${e.message}`);
        }

        log('Beamable Hub 脚本执行完毕，跳转至 Talus Loyalty 页面。');
        await randomDelay(5000, 10000);
        window.location.href = 'https://hub.talus.network/loyalty';
    }

    // 脚本10：Talus Loyalty 自动化操作
    async function executeScript10() {
        log('执行 Talus Loyalty 自动化脚本...');

        // 等待元素出现（支持XPath和CSS选择器，返回null而不是抛出错误）
        async function waitForElement(selector, isXPath = false, timeout = 20000) {
            const start = Date.now();
            while (Date.now() - start < timeout) {
                let element;
                if (isXPath) {
                    element = document.evaluate(selector, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                } else {
                    element = document.querySelector(selector);
                }
                if (element) return element;
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            log(`未能在${timeout}ms内找到元素：${selector}，继续执行后续步骤`);
            return null;
        }

        // 优化元素3的识别函数
        async function findElement3(timeout = 20000) {
            const start = Date.now();
            while (Date.now() - start < timeout) {
                const candidates = document.querySelectorAll('[id^="radix-"] > div > div > div > button');
                for (const candidate of candidates) {
                    if (candidate.closest('[id^="radix-"]') && candidate.tagName.toLowerCase() === 'button') {
                        log("找到符合条件的元素3候选");
                        return candidate;
                    }
                }
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            log("未找到符合条件的元素3");
            return null;
        }

        // 点击元素并验证成功的函数
        async function clickElement(element, description) {
            if (element) {
                simulateClick(element);
                log(`${description} 点击成功`);
                await randomDelay(1000, 3000);
            } else {
                log(`${description} 未找到`);
            }
        }

        try {
            log("等待页面完全加载...");
            await randomDelay(2000, 5000);

            const element2Selector = '#loyalty-quest-root-check_in > div > div.flex.items-center.gap-3.order-2.lg\\:order-none > button';
            const element4XPath = '//*[@id="loyalty-quest-root-drip_x_new_tweet"]/div/div[3]/a';

            log("检查元素2...");
            const element2 = await waitForElement(element2Selector);
            await clickElement(element2, "元素2");

            log("等待元素3出现...");
            const element3 = await findElement3();
            await clickElement(element3, "元素3");

            log("开始持续点击元素4...");
            while (true) {
                const element4 = document.evaluate(element4XPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                if (!element4) {
                    log("元素4已消失，跳转至 Bithub 页面");
                    break;
                }
                await clickElement(element4, "元素4");
                await randomDelay(3000, 6000);
            }

            await randomDelay(5000, 10000);
            window.location.href = 'https://bithub.77-bit.com/';
        } catch (error) {
            log(`Talus Loyalty 脚本执行出错: ${error.message}，尝试跳转至 Bithub 页面`);
            await randomDelay(5000, 10000);
            window.location.href = 'https://bithub.77-bit.com/';
        }
    }

    // 脚本9：Bithub 自动化操作
    async function executeScript9() {
        log('执行 Bithub 自动化脚本...');

        // 等待元素出现（支持XPath）
        async function waitForXPath(xpath, timeout = 20000) {
            const start = Date.now();
            while (Date.now() - start < timeout) {
                const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                if (element) return element;
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            throw new Error(`超时：未能在${timeout}ms内找到XPath元素：${xpath}`);
        }

        // 点击元素并验证成功的函数
        async function clickElement(element, description) {
            if (element) {
                simulateClick(element);
                log(`${description} 点击成功`);
                await randomDelay(1000, 3000);
            } else {
                log(`${description} 未找到`);
            }
        }

        try {
            log("等待页面完全加载...");
            await randomDelay(2000, 5000);

            const claimXPath = '//*[@id="__nuxt"]/div[2]/div[4]/div[3]/div/div[4]/div/div[1]';
            const element2Selector = '#__nuxt > div.root > div.achievements > div.footer.achievements__footer > div.button-frame.section.section--primary.mission-section.footer__daily';
            const element3Selector = '#__nuxt > div.root > div.daily > div.info.daily__info > div.info__description.description > div.clip-container.common-button.button.description__button > div > div.common-button__content';
            const element4Selector = '#__nuxt > div.root > div.root__header > div > div.info.header__info > div.info__currencies > div.button-frame.info__group.bits > h1';
            const element5Selector = '#__nuxt > div.root > div.purchase-popup > div > div.items.items--large.items--secondary > div.button-frame.card.card--daily > div.card__inner > div.clip-container.button.button--daily.card__buy-btn.card__buy-btn--primary > div > div';

            log("开始监控元素1...");
            const claimElement = await waitForXPath(claimXPath);

            for (let i = 1; i <= 5; i++) {
                await clickElement(claimElement, `元素1 (第${i}次)`);
                if (i < 5) {
                    await randomDelay(3000, 6000);
                }
            }

            const element2 = document.querySelector(element2Selector);
            await clickElement(element2, "元素2");

            const element3 = document.querySelector(element3Selector);
            await clickElement(element3, "元素3");

            const element4 = document.querySelector(element4Selector);
            await clickElement(element4, "元素4");

            const element5 = document.querySelector(element5Selector);
            await clickElement(element5, "元素5");

            log('Bithub 脚本执行完毕，跳转至 KlokApp 页面。');
            await randomDelay(5000, 10000);
            window.location.href = 'https://klokapp.ai/app';
        } catch (error) {
            log(`Bithub 脚本执行出错: ${error.message}，尝试跳转至 KlokApp 页面`);
            await randomDelay(5000, 10000);
            window.location.href = 'https://klokapp.ai/app';
        }
    }

    // 脚本8：KlokApp Automation
    async function executeScript8() {
        log('执行 KlokApp 自动化脚本...');

        async function waitForElement(cssSelector, xpath, timeout = 30000) {
            const start = Date.now();
            while (Date.now() - start < timeout) {
                const elementByCss = document.querySelector(cssSelector);
                if (elementByCss) {
                    log(`通过CSS选择器找到元素: ${cssSelector}`);
                    return elementByCss;
                }

                const elementByXPath = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                if (elementByXPath) {
                    log(`通过XPath找到元素: ${xpath}`);
                    return elementByXPath;
                }

                await new Promise(resolve => setTimeout(resolve, 500));
            }
            throw new Error(`超时：未能在${timeout}ms内找到元素 - CSS: ${cssSelector}, XPath: ${xpath}`);
        }

        async function getButtons(timeout = 30000) {
            const buttons = [];
            const baseXPath = '/html/body/div[1]/div[2]/div[2]/div[2]/div[2]/button';
            const start = Date.now();

            while (Date.now() - start < timeout) {
                for (let i = 1; i <= 4; i++) {
                    const xpath = `${baseXPath}[${i}]`;
                    const button = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    if (button) buttons.push(button);
                }
                if (buttons.length > 0) return buttons;
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            throw new Error('未能在超时时间内找到任何按钮');
        }

        async function checkElementExists(selector, timeout = 5000) {
            const start = Date.now();
            while (Date.now() - start < timeout) {
                const element = document.querySelector(selector);
                if (element) return element;
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            return null;
        }

        const loginButtonSelector = 'body > div.AuthContainer_container__lGPSt > div > div.style_loginBtns__HdAFX > button.style_button__pYQlj.style_primary__w2PcZ';
        const element2Selector = 'body > div.page_container__FA90Q.page_empty__aDXOo > div.flex.justify-between.gap-10 > div.style_sidebar__efxYk > div.flex.flex-col.xs\\:sticky.md\\:fixed.md\\:top-\\[32px\\].xs\\:top-0.bg-\\[\\#14171b\\].z-10.xs\\:pt-8.xs\\:pb-4.lg\\:py-0 > a';
        const element2XPath = '/html/body/div[1]/div[2]/div[1]/div[1]/a';
        const errorMessageSelector = 'h2[style="font-size: 14px; font-weight: 400; line-height: 28px; margin: 0px 8px;"]';

        try {
            const loginButton = await checkElementExists(loginButtonSelector);
            if (loginButton) {
                log('找到登录按钮，准备点击...');
                simulateClick(loginButton);
                log('登录按钮已点击，等待循环操作元素出现...');

                const startWait = Date.now();
                while (Date.now() - startWait < 30000) {
                    const errorMessage = document.querySelector(errorMessageSelector);
                    if (errorMessage && errorMessage.textContent.includes('Application error')) {
                        log('检测到客户端错误，刷新页面...');
                        window.location.reload();
                        await new Promise(resolve => setTimeout(resolve, randomDelay(5000, 10000)));
                        break;
                    }

                    const buttons = await getButtons(5000).catch(() => []);
                    if (buttons.length > 0) {
                        log('循环操作元素已就绪，开始执行循环...');
                        break;
                    }
                    await randomDelay(500, 1000);
                }
            } else {
                log('未找到登录按钮，直接执行循环操作...');
            }

            for (let i = 1; i <= 12; i++) {
                log(`开始第 ${i} 次循环...`);

                const buttons = await getButtons();
                if (buttons.length < 1) {
                    log('未找到任何按钮，跳过本次循环...');
                    continue;
                }
                log(`找到 ${buttons.length} 个按钮可供选择。`);

                const randomIndex = Math.floor(Math.random() * buttons.length);
                const selectedButton = buttons[randomIndex];
                log(`随机选择按钮 ${randomIndex + 1}，准备点击...`);
                simulateClick(selectedButton);

                await randomDelay(8000, 10000);

                try {
                    const element2 = await waitForElement(element2Selector, element2XPath);
                    log('找到元素2，准备点击...');
                    simulateClick(element2);
                } catch (error) {
                    log(`点击元素2失败: ${error.message}，继续下一循环...`);
                }

                if (i < 12) {
                    log(`第 ${i} 次循环完成，等待下一轮...`);
                    await randomDelay(2000, 3000);
                }
            }

            log('KlokApp 脚本执行完毕，脚本结束。');
        } catch (error) {
            log(`KlokApp 脚本执行出错: ${error.message}`);
        }
    }

    // 执行主函数
    main().catch(error => log(`脚本执行出错: ${error}`));
})();
