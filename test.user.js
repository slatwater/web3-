// ==UserScript==
// @name         自动化脚本：Avalon、Glob Shaga、SideQuest、Forge.gg、XtremeVerse
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  自动化操作 Avalon、Glob Shaga、SideQuest、Forge.gg 和 XtremeVerse 页面上的任务，修复URL匹配和小窗口1识别问题
// @author       Grok 3 by xAI
// @match        https://quests.avalon.online/*
// @match        https://glob.shaga.xyz/main
// @match        https://sidequest.rcade.game/*
// @match        https://forge.gg/quests
// @match        https://xnet.xtremeverse.xyz/earn?index=1
// @updateURL    https://github.com/slatwater/web3-/raw/refs/heads/main/test.user.js
// @downloadURL  https://github.com/slatwater/web3-/raw/refs/heads/main/test.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 日志输出函数
    function log(message) {
        console.log(`[自动化脚本 v1.4] ${message}`);
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

    // 等待元素出现
    async function waitForSelector(selector, timeout = 20000, context = document) {
        const start = Date.now();
        while (Date.now() - start < timeout) {
            const element = context.querySelector(selector);
            if (element) return element;
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        throw new Error(`超时：未能在${timeout}ms内找到元素：${selector}`);
    }

    // 主函数
    async function main() {
        log('脚本启动，等待页面加载...');
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
                log('Collect按钮已点击，跳转至 Glob Shaga 页面。');
                buttonFound = true;
                await randomDelay(5000, 10000);
                window.location.href = 'https://glob.shaga.xyz/main';
            } else {
                log('未找到Collect按钮，继续等待...');
                await randomDelay(1000, 2000);
            }
        }

        if (!buttonFound) {
            log('20秒超时，未找到Collect按钮，跳转至 Glob Shaga 页面...');
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
            selectedButton.click();

            // 恢复并优化小窗口1定位
            async function findSmallWindow1(timeout = 10000) {
                const startTime = Date.now();
                while (Date.now() - startTime < timeout) {
                    const potentialWindows = document.querySelectorAll('body > div');
                    for (const div of potentialWindows) {
                        const buttonContainer = div.querySelector('div > div > div.btn-container > button');
                        if (buttonContainer) {
                            log('动态定位到小窗口1');
                            return div.querySelector('div > div > div');
                        }
                    }
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
                log('未找到小窗口1，尝试备用定位...');
                // 备用定位：检查包含按钮的模态窗口
                const modals = document.querySelectorAll('body > div');
                for (const modal of modals) {
                    if (modal.querySelector('button') && modal.style.display !== 'none') {
                        log('使用备用定位找到小窗口1');
                        return modal.querySelector('div > div > div') || modal;
                    }
                }
                throw new Error('未找到小窗口1');
            }

            try {
                const smallWindow1 = await findSmallWindow1(10000);
                log('小窗口1已出现。');
                await randomDelay(1000, 2000);

                const element1Selector = 'div.btn-container > button';
                const element1Button = await waitForSelector(element1Selector, 10000, smallWindow1);
                element1Button.click();
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

                const element2Selector = 'button > img';
                const element2 = await waitForSelector(element2Selector, 10000, smallWindow1);
                element2.click();
                log('点击小窗口1中的关闭按钮。');
            } catch (error) {
                log(`小窗口1处理失败: ${error.message}，延迟后继续循环...`);
                await randomDelay(2000, 4000); // 失败后延迟
            }
            await randomDelay(2000, 4000);
        }

        const element3Selector = '#root > div > div > div.main > div.content.undefined > div > div.spin-container > div > button';
        try {
            const element3 = await waitForSelector(element3Selector, 10000);
            element3.click();
            log('点击Spin按钮，等待小窗口2...');

            const smallWindow2Selector = 'body > div:nth-child(8) > div > div > div > div';
            await waitForSelector(smallWindow2Selector, 10000);
            const element4Selector = `${smallWindow2Selector} > button.spin-btn`;
            const element4 = await waitForSelector(element4Selector, 10000);
            element4.click();
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
            element5.click();
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
        const element1XPath = '//*[@id="bodyNode"]/div[4]/div[1]/div/div[1]/div[2]/div[2]';
        const element1 = document.evaluate(element1XPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element1) {
            element1.click();
            log('点击元素1。');
        } else throw new Error('未找到元素1。');

        await randomDelay(3000, 5000);
        const region1Selector = '#bodyNode > div.Box-sc-1rsndmr-0.styles__WrapT-sc-1gtzf12-4.lkoHY.fUbung > div.Box-sc-1rsndmr-0.styles__ZoomContentWrap-sc-1gtzf12-6.lkoHY.foLijU > div > div.airdrop__AirDropContentContainer-sc-4wk6us-0.jFBdMN > div > div > div:nth-child(2) > div:nth-child(2)';
        const region1 = await waitForSelector(region1Selector);

        while (true) {
            const verifyButtons = Array.from(region1.querySelectorAll('div.SocialFarming__FarmButton-sc-neia86-8.kJBPou'))
                .filter(div => div.textContent.trim() === 'Verify');
            if (verifyButtons.length === 0) {
                log('无更多Verify按钮。');
                break;
            }

            for (const btn of verifyButtons) {
                btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                await randomDelay(500, 1500);
                btn.click();
                log('点击一个Verify按钮。');
                await randomDelay(500, 1000);
            }
            await randomDelay(2000, 4000);
        }

        const element2XPath = '//*[@id="bodyNode"]/div[4]/div[1]/div/div[2]/div/div/div[2]/div[2]/div[2]/div/div/div/div[3]/div';
        const element2 = document.evaluate(element2XPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element2) {
            element2.click();
            log('点击元素2。');
        } else throw new Error('未找到元素2。');

        await randomDelay(1000, 3000);
        const dialogSelector = 'div[id^="dialog-"]:not([aria(hidden="true"])';
        const dialog = await waitForSelector(dialogSelector, 10000);
        log('对话框已出现。');

        const element3XPath = '//*[@id="dialog-:r1:"]/div/div/div/div/div/div[3]/div[1]/svg/path';
        while (true) {
            const element3Span = document.evaluate(element3XPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (!element3Span || !document.querySelector(dialogSelector)) break;
            const button = element3Span.closest('button');
            if (button) {
                button.scrollIntoView({ behavior: 'smooth', block: 'center' });
                await randomDelay(500, 1500);
                button.click();
                log('点击元素3。');
                await randomDelay(1000, 2000);
            }
        }

        log('XtremeVerse 脚本执行完毕，脚本结束。');
    }

    // 执行主函数
    main().catch(error => log(`脚本执行出错: ${error}`));
})();
