// ==UserScript==
// @name         自动化脚本：Avalon、Shaga、SideQuest、Humanity、Forge、XtremeVerse、Mahojin、Magic Newton、Beamable、Talus、Bithub、KlokApp
// @namespace    http://tampermonkey.net/
// @version      8.5
// @description  自动化操作 Avalon、Shaga、SideQuest、Humanity、Forge、XtremeVerse、Mahojin、Magic Newton、Beamable、Talus、Bithub 和 KlokApp 页面上的任务
// @author       Grok 3 by xAI
// @match        https://quests.avalon.online/*
// @match        https://glob.shaga.xyz/main
// @match        https://sidequest.rcade.game/*
// @match        https://testnet.humanity.org/dashboard
// @match        https://forge.gg/quests
// @match        https://xnet.xtremeverse.xyz/earn?index=1
// @match        https://app.mahojin.ai/my/point
// @match        https://www.magicnewton.com/portal/rewards
// @match        https://hub.talus.network/loyalty
// @match        https://klokapp.ai/*
// @updateURL    https://github.com/slatwater/web3-/raw/refs/heads/main/test.user.js
// @downloadURL  https://github.com/slatwater/web3-/raw/refs/heads/main/test.user.js
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';

    // 日志输出函数（统一日志格式）
    function log(message) {
        console.log(`[自动化脚本 v7.3] ${message}`);
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
        log('确认脚本版本：v7.3');
        await waitForPageLoad();
        await randomDelay(1000, 3000);

        const currentURL = window.location.href;
        log(`当前页面URL: ${currentURL}`);
        try {
            if (currentURL.includes('quests.avalon.online')) await executeScript0();
            else if (currentURL.includes('glob.shaga.xyz/main')) await executeScript2();
            else if (currentURL.includes('sidequest.rcade.game')) await executeScript3();
            else if (currentURL.includes('testnet.humanity.org/dashboard')) await executeScript5();
            else if (currentURL.includes('forge.gg/quests')) await executeScript4();
            else if (currentURL.includes('xnet.xtremeverse.xyz/earn')) await executeScript6();
            else if (currentURL.includes('app.mahojin.ai/my/point')) await executeScript12();
            else if (currentURL.includes('www.magicnewton.com/portal/rewards')) await executeScript11();
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
            log(`任务列表未找到: ${error.message}，跳转至 Humanity 页面`);
            await randomDelay(5000, 10000);
            window.location.href = 'https://testnet.humanity.org/dashboard';
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

        log('SideQuest 脚本执行完毕，跳转至 Humanity 页面。');
        await randomDelay(5000, 10000);
        window.location.href = 'https://testnet.humanity.org/dashboard';
    }

    // 脚本5：Humanity Dashboard 自动化操作
    async function executeScript5() {
        log('执行 Humanity Dashboard 自动化脚本...');

        try {
            log('等待页面完全加载...');
            await waitForPageLoad();
            await randomDelay(20000, 25000);

            const buttonSelector = 'button.px-4.py-1\\.5.rounded-lg.text-sm.font-semibold.bg-\\[\\#6DFB3F\\]';
            const backupSelector = 'button:not([disabled])[class*="bg-"]:contains("Claim")';
            let claimButton;
            try {
                claimButton = await waitForSelector(buttonSelector, 20000);
                log('找到主选择器 Claim 按钮');
            } catch (error) {
                log(`主选择器未找到 Claim 按钮: ${error.message}，尝试备用选择器...`);
                claimButton = await waitForSelector(backupSelector, 10000);
            }

            if (claimButton) {
                log('准备点击 Claim 按钮');
                simulateClick(claimButton);
                log('Claim 按钮已点击');
                await randomDelay(2000, 2500);
            } else {
                log('未找到 Claim 按钮，跳过点击');
            }

            log('Humanity 脚本执行完毕，跳转至 Forge.gg 页面。');
            await randomDelay(5000, 10000);
            window.location.href = 'https://forge.gg/quests';
        } catch (error) {
            log(`Humanity 脚本执行出错: ${error.message}，尝试跳转至 Forge.gg 页面`);
            await randomDelay(5000, 10000);
            window.location.href = 'https://forge.gg/quests';
        }
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
        const element1XPath = '//*[@id="bodyNode"]/div[4]/div[1]/div/div[1]/div[2]/div[2]';
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
        const element2XPath = '//*[@id="bodyNode"]/div[4]/div[1]/div/div[2]/div/div/div[2]/div[2]/div[2]/div/div/div/div[3]/div';
        const element2 = document.evaluate(element2XPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element2) {
            element2.click();
            log('点击元素2。');
        } else {
            log('未找到元素2，跳过点击。');
        }

        await randomDelay(1000, 3000);

        // 处理对话框中的元素3
        const dialogSelector = '#bodyNode .airdrop__AirDropContentContainer-sc-4wk6us-0 > div.styles__Container-sc-1gtzf12-17 > div > div > div > div';
        let dialog;
        try {
            dialog = await waitForSelector(dialogSelector, 10000);
            log('对话框已出现。');
        } catch (error) {
            log(`对话框等待失败: ${error.message}，继续执行...`);
        }

        if (dialog) {
            const element3Selector = '#bodyNode .airdrop__AirDropContentContainer-sc-4wk6us-0 > div.styles__Container-sc-1gtzf12-17 > div > div > div > div > div:nth-child(3) > div.CounterClipped__Wrapper-sc-w6vnyi-2 button';
            while (true) {
                const button = document.querySelector(element3Selector);
                if (!button || !document.querySelector(dialogSelector)) {
                    log('对话框中元素3处理完毕或对话框已关闭。');
                    break;
                }
                try {
                    button.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    await randomDelay(500, 1500);
                    button.click();
                    log('点击元素3。');
                    await randomDelay(1000, 2000);
                } catch (error) {
                    log(`点击元素3失败: ${error.message}`);
                    break;
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

        try {
            log("等待页面完全加载...");
            await waitForPageLoad();
            await randomDelay(2000, 5000); // 等待2-5秒确保页面稳定

            // 优化后的选择器
            const element1Selector = 'div[class*="md\\:on-mypage"] div[class*="gap-4 md\\:flex-row"] > div[class*="basis-\\[calc\\(50\\%-8px\\)\\]"] > div:nth-child(2) > div > div:nth-child(1) > button';

            log("等待元素1出现...");
            let element1 = await waitForSelector(element1Selector, 20000);
            if (!element1) {
                log('主选择器未找到元素1，尝试备用选择器...');
                const backupSelector = 'div[class*="md\\:on-mypage"] button';
                element1 = await waitForSelector(backupSelector, 10000);
                if (element1) {
                    log('备用选择器找到元素1');
                }
            }

            if (element1) {
                simulateClick(element1);
                log('元素1 已触发点击');
                await randomDelay(500, 1000);
            } else {
                log('元素1 未找到，跳过点击');
            }

            log('Mahojin Point 脚本执行完毕，跳转至 Magic Newton 页面。');
            await randomDelay(5000, 10000);
            window.location.href = 'https://www.magicnewton.com/portal/rewards';
        } catch (error) {
            log(`Mahojin Point 脚本执行出错: ${error.message}，尝试跳转至 Magic Newton 页面`);
            await randomDelay(5000, 10000);
            window.location.href = 'https://www.magicnewton.com/portal/rewards';
        }
    }

    // 脚本11：Magic Newton Rewards 自动化操作（优化后的版本，含点击无效统计和状态变化检测）
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

        // 点击元素并检测状态变化的函数（针对元素7优化）
        async function clickElement(element, description, isElement7 = false) {
            if (!element) {
                log(`${description} 未找到`);
                return false;
            }

            // 记录点击前的状态（仅对元素7）
            let preClickState = null;
            if (isElement7) {
                preClickState = {
                    className: element.className,
                    color: getComputedStyle(element).color,
                    textContent: element.textContent.trim(),
                    backgroundColor: getComputedStyle(element).backgroundColor
                };
            }

            element.click(); // 使用原生 click() 方法
            log(`${description} 已触发点击`);
            await randomDelay(500, 1000); // 短暂延迟以确保页面响应

            if (isElement7) {
                // 检查点击后的状态
                const postClickState = {
                    className: element.className,
                    color: getComputedStyle(element).color,
                    textContent: element.textContent.trim(),
                    backgroundColor: getComputedStyle(element).backgroundColor
                };

                // 判断状态是否变化
                const stateChanged = (
                    preClickState.className !== postClickState.className ||
                    preClickState.color !== postClickState.color ||
                    preClickState.textContent !== postClickState.textContent ||
                    preClickState.backgroundColor !== postClickState.backgroundColor
                );

                if (stateChanged) {
                    log(`${description} 点击后状态已变化，点击有效`);
                    return true; // 点击有效
                } else {
                    log(`${description} 点击后状态未变化，点击无效`);
                    return false; // 点击无效
                }
            } else {
                // 非元素7，仅记录可见性变化
                const stillVisible = document.querySelector(element.tagName + '[class="' + element.className + '"]');
                if (!stillVisible || stillVisible.offsetParent === null) {
                    log(`${description} 点击后元素状态已变化，点击可能成功`);
                } else {
                    log(`${description} 点击后元素仍可见，可能未响应`);
                }
                return true; // 非元素7默认返回true，不影响逻辑
            }
        }

        // 过滤元素7的函数，排除特定状态
        function filterElement7List(elements) {
            return Array.from(elements).filter(element => {
                const style = getComputedStyle(element);
                const classList = element.className;
                const textContent = element.textContent.trim();

                // 排除条件1: background-color: transparent; border: none; box-shadow: none; color: white
                const isTransparentStyle = style.backgroundColor === 'rgba(0, 0, 0, 0)' && 
                                           style.border === 'none' && 
                                           style.boxShadow === 'none' && 
                                           style.color === 'rgb(255, 255, 255)';
                if (isTransparentStyle) {
                    log(`排除元素7: 透明样式 - ${element.outerHTML}`);
                    return false;
                }

                // 排除条件2: class包含"tile-changed"且color为rgb(167, 153, 255)，文本为"1"
                const isChangedTile1 = classList.includes('tile-changed') && 
                                       style.color === 'rgb(167, 153, 255)' && 
                                       textContent === '1';
                if (isChangedTile1) {
                    log(`排除元素7: 已变更样式 (紫色, "1") - ${element.outerHTML}`);
                    return false;
                }

                // 排除条件3: class包含"tile-changed"且color为rgb(0, 204, 143)，文本为"2"
                const isChangedTile2 = classList.includes('tile-changed') && 
                                       style.color === 'rgb(0, 204, 143)' && 
                                       textContent === '2';
                if (isChangedTile2) {
                    log(`排除元素7: 已变更样式 (绿色, "2") - ${element.outerHTML}`);
                    return false;
                }

                // 排除条件4: class包含"tile-changed"且color为rgb(255, 213, 148)，文本为"3"
                const isChangedTile3 = classList.includes('tile-changed') && 
                                       style.color === 'rgb(255, 213, 148)' && 
                                       textContent === '3';
                if (isChangedTile3) {
                    log(`排除元素7: 已变更样式 (黄色, "3") - ${element.outerHTML}`);
                    return false;
                }

                return true;
            });
        }

        // 检查元素2-1的专用函数
        async function checkElement2_1(timeout = 10000) {
            const selector = 'p.gGRRlH.WrOCw.AEdnq.gTXAMX.gsjAMe';
            const start = Date.now();
            while (Date.now() - start < timeout) {
                const elements = document.querySelectorAll(selector);
                for (const element of elements) {
                    const style = getComputedStyle(element);
                    const text = element.textContent.trim();
                    if (style.color === 'rgb(0, 0, 0)' && text === 'Return Home') {
                        log(`找到元素2-1：class="${element.className}", style="${element.getAttribute('style')}", text="${text}"`);
                        return element;
                    }
                }
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            log(`未能在${timeout}ms内找到元素2-1（class包含"gGRRlH WrOCw AEdnq gTXAMX gsjAMe"，color: black，text: "Return Home"）`);
            return null;
        }

        try {
            log("等待页面完全加载...");
            await waitForPageLoad();
            await randomDelay(2000, 5000); // 等待2-5秒确保页面稳定

            // 定义元素选择器
            const element1Selector = 'body > div.dMMuNs.kcKISj > div.fPSBzf.bYPztT.dKLBtz.iRgpoQ.container-page-loaded > div.fPSBzf.container-content > div > div:nth-child(1) > div.fPSBzf.iHMUPj.iHMUNW.pezuA.iRgpoQ.hlUslA.content-column-sml > div.fPSBzf.hlUslA.jSqJiD.dMMuNs.oBvEG.dOouYe.fJVVlQ.dNTNvO.Axhdq.frIWUH.dFrlbO.ksdoCR.jvYutH > div > div > div > div > button > div > p';
            const element2Selector = 'body > div.dMMuNs.kcKISj > div.fPSBzf.bYPztT.dKLBtz.iRgpoQ.container-page-loaded > div.fPSBzf.container-content > div > div:nth-child(1) > div.jsx-f1b6ce0373f41d79.info-tooltip-control > button > div > p';
            const element3Selector = 'body > div.dMMuNs.kcKISj > div.fPSBzf.bYPztT.dKLBtz.iRgpoQ.container-page-loaded > div.fPSBzf.container-content > div > div.jsx-f1b6ce0373f41d79.info-tooltip-control > button > div > p';
            const element4Selector = 'body > div.dMMuNs.kcKISj > div.fPSBzf.bYPztT.dKLBtz.iRgpoQ.container-page-loaded > div.fPSBzf.container-content > div > div:nth-child(1) > div:nth-child(2) > button > div > p';
            const element5Selector = 'body > div.dMMuNs.kcKISj > div.fPSBzf.bYPztT.dKLBtz.iRgpoQ.container-page-loaded > div.fPSBzf.container-content > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div > div > button > div > p';
            const element6Selector = 'body > div.dMMuNs.kcKISj > div.fPSBzf.bYPztT.dKLBtz.iRgpoQ.container-page-loaded > div.fPSBzf.container-content > div > div.fPSBzf.bYPztT.bYPznK.hdAwi.fzoLlu.qbeer.kiKDyH.dnFyWD.kcKISj.VrCRh.icmKIQ > div:nth-child(2) > div.fPSBzf.cMGtQw.gEYBVn.hYZFkb.dnSWCz.jTWvec.hlUslA.fOVJNr.jNyvxD > div > div > div.fPSBzf.bYPztT.bYPznK.pezuA.cMGtQw.pBppg.dMMuNs > button';
            const element7Selector = 'div.tile.jetbrains';
            const element8Selector = 'body > div.dMMuNs.kcKISj > div.fPSBzf.bYPztT.dKLBtz.iRgpoQ.container-page-loaded > div.fPSBzf.container-content > div > div.fPSBzf.bYPztT.bYPznK.pezuA.cMGtQw.pBppg.dMMuNs > button:nth-child(1) > div';

            // 点击元素1
            log("等待元素1出现...");
            const element1 = await waitForElement(element1Selector);
            await clickElement(element1, "元素1");

            // 判断元素2-1和元素2
            log("检查元素2-1和元素2...");
            const element2_1 = await checkElement2_1(10000);
            if (element2_1) {
                await clickElement(element2_1, "元素2-1");
                log("元素2-1存在，直接跳转至元素5...");
            } else {
                log("元素2-1不存在，检查元素2...");
                const element2 = await waitForElement(element2Selector);
                await clickElement(element2, "元素2");

                log("等待元素3出现...");
                const element3 = await waitForElement(element3Selector);
                await clickElement(element3, "元素3");

                log("等待元素4出现...");
                const element4 = await waitForElement(element4Selector);
                await clickElement(element4, "元素4");
            }

            // 点击元素5
            log("等待元素5出现...");
            const element5 = await waitForElement(element5Selector);
            await clickElement(element5, "元素5");

            // 点击元素6
            log("等待元素6出现...");
            const element6 = await waitForElement(element6Selector);
            await clickElement(element6, "元素6");

            // 循环点击元素7和元素8三次，新增点击无效统计
            let clickFailureCount = 0; // 统计元素7点击无效的次数
            const maxFailures = 7; // 最大允许失败次数

            for (let i = 1; i <= 3; i++) {
                log(`开始第 ${i} 次元素7和元素8的循环...`);

                while (true) {
                    const allElement7List = document.querySelectorAll(element7Selector);
                    const filteredElement7List = filterElement7List(allElement7List);

                    if (filteredElement7List.length === 0) {
                        log('未找到符合条件的元素7，跳过本次循环');
                        break;
                    }

                    const randomIndex = Math.floor(Math.random() * filteredElement7List.length);
                    const element7 = filteredElement7List[randomIndex];
                    log(`随机选择过滤后的元素7（第 ${randomIndex + 1} 个），准备点击...`);
                    const clickSuccess = await clickElement(element7, `元素7 (第 ${randomIndex + 1} 个)`, true);

                    if (!clickSuccess) {
                        clickFailureCount++;
                        log(`元素7点击无效次数累计: ${clickFailureCount}/${maxFailures}`);
                        if (clickFailureCount >= maxFailures) {
                            log(`元素7点击无效次数超过${maxFailures}次，结束循环，跳转至Beamable Hub页面`);
                            await randomDelay(5000, 10000);
                            window.location.href = 'https://hub.talus.network/loyalty';
                            return; // 直接退出函数
                        }
                    } else {
                        // 点击成功时重置计数器
                        clickFailureCount = 0;
                    }

                    const element8 = await waitForElement(element8Selector, 1000);
                    if (element8) {
                        log("元素8已出现，准备点击...");
                        await clickElement(element8, "元素8");
                        break;
                    }

                    await randomDelay(1000, 2000);
                }

                if (i < 3) {
                    log(`第 ${i} 次循环完成，等待下一轮...`);
                    await randomDelay(2000, 3000);
                }
            }

            log('Magic Newton 脚本执行完毕，跳转至 Beamable Hub 页面。');
            await randomDelay(5000, 10000);
            window.location.href = 'https://hub.talus.network/loyalty';
        } catch (error) {
            log(`Magic Newton 脚本执行出错: ${error.message}，尝试跳转至 Beamable Hub 页面`);
            await randomDelay(5000, 10000);
            window.location.href = 'https://hub.talus.network/loyalty';
        }
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
            window.location.href = 'https://klokapp.ai/';
        } catch (error) {
            log(`Talus Loyalty 脚本执行出错: ${error.message}，尝试跳转至 Bithub 页面`);
            await randomDelay(5000, 10000);
            window.location.href = 'https://klokapp.ai/';
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

                if (i < 30) {
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
