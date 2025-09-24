// ==UserScript==
// @name         自动化脚本：Avalon、Shaga、SideQuest、Humanity、Forge、XtremeVerse、Mahojin、Magic Newton、Beamable、Talus、Bithub、KlokApp
// @namespace    http://tampermonkey.net/
// @version      10.9
// @description  自动化操作 Avalon、Shaga、SideQuest、Humanity、Forge、XtremeVerse、Mahojin、Magic Newton、Beamable、Talus、Bithub 和 KlokApp 页面上的任务
// @author       Grok 3 by xAI
// @match        https://quests.avalon.online/*
// @match        https://glob.shaga.xyz/main
// @match        https://xnet.xtremeverse.xyz/earn?index=1
// @match        https://app.mahojin.ai/my/point
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
            else if (currentURL.includes('xnet.xtremeverse.xyz/earn')) await executeScript6();
            else if (currentURL.includes('app.mahojin.ai/my/point')) await executeScript12();
            else if (currentURL.includes('hub.talus.network/loyalty')) await executeScript10();
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
            window.location.href = 'https://hub.talus.network/loyalty';
        } catch (error) {
            log(`Mahojin Point 脚本执行出错: ${error.message}，尝试跳转至 Magic Newton 页面`);
            await randomDelay(5000, 10000);
            window.location.href = 'https://hub.talus.network/loyalty';
        }
    }



    // 脚本10：Talus Loyalty 自动化操作
    async function executeScript10() {
        log('执行 Talus Loyalty 自动化脚本...');
    
        // 等待元素出现（支持CSS选择器，返回null而不是抛出错误）
        async function waitForElement(selector, timeout = 20000) {
            const start = Date.now();
            while (Date.now() - start < timeout) {
                const element = document.querySelector(selector);
                if (element) return element;
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            log(`未能在${timeout}ms内找到元素：${selector}，继续执行后续步骤`);
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
    
            const element2Selector = '#loyalty-quest-root-check_in > div > div.flex.flex-col.lg\\:flex-row.gap-3.order-2.lg\\:order-none > div > button';
            const elementASelector = '#loyalty-quest-root-link_click > div > div.flex.flex-col.lg\\:flex-row.gap-3.order-2.lg\\:order-none.min-w-0 > div > a';
    
            // 遍历点击所有元素a，最多点击4个
            log("检查元素a...");
            let clickCount = 0;
            const maxClicks = 2;
            let elementA = document.querySelectorAll(elementASelector);
            while (elementA.length > 0 && clickCount < maxClicks) {
                for (let i = 0; i < elementA.length && clickCount < maxClicks; i++) {
                    await clickElement(elementA[i], `元素a[${clickCount + 1}]`);
                    clickCount++;
                }
                // 重新检查元素a是否存在
                await randomDelay(1000, 2000);
                elementA = document.querySelectorAll(elementASelector);
            }
            log(`元素a点击完成，累计点击${clickCount}次`);
    
            log("检查元素2...");
            const element2 = await waitForElement(element2Selector);
            await clickElement(element2, "元素2");
    
            log("等待5秒后跳转...");
            await new Promise(resolve => setTimeout(resolve, 5000));
            window.location.href = 'https://klokapp.ai/';
        } catch (error) {
            log(`Talus Loyalty 脚本执行出错: ${error.message}，尝试跳转至 Bithub 页面`);
            await new Promise(resolve => setTimeout(resolve, 5000));
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

            for (let i = 1; i <= 30; i++) {
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
