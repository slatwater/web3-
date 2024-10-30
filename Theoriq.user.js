// ==UserScript==
// @name         Infinity Theoriq AI 自动化脚本
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  在 Infinity Theoriq AI 网站上自动执行特定任务
// @author
// @match        https://infinity.theoriq.ai/studio/chat
// @grant        none
// @updateURL    https://github.com/slatwater/web3-/raw/refs/heads/main/Theoriq.user.js
// @downloadURL  https://github.com/slatwater/web3-/raw/refs/heads/main/Theoriq.user.js
// ==/UserScript==

(function() {
    'use strict';

    // 日志函数，统一格式
    function log(message) {
        console.log(`[自动化脚本] ${message}`);
    }

    // 随机延迟函数
    function randomDelay(min = 500, max = 1000) {
        const delay = Math.floor(Math.random() * (max - min + 1)) + min;
        return new Promise(resolve => setTimeout(resolve, delay));
    }

    // 修复输入框无法识别文本的问题，正确触发 React 的事件
    function setNativeValue(element, value) {
        const lastValue = element.value;
        element.value = value;
        const event = new Event('input', { bubbles: true });
        // Hack React15
        event.simulated = true;
        // Hack React16 内部属性
        const tracker = element._valueTracker;
        if (tracker) {
            tracker.setValue(lastValue);
        }
        element.dispatchEvent(event);
    }

    // 模拟人类打字，在输入框中输入文本
    async function simulateTyping(element, text) {
        const typingSpeed = 30; // 每个字符的输入速度（毫秒），已加快
        for (let char of text) {
            let currentValue = element.value;
            setNativeValue(element, currentValue + char);
            await new Promise(resolve => setTimeout(resolve, typingSpeed + Math.random() * 20));
        }
    }

    // 等待指定的 XPath 元素出现在 DOM 中
    function waitForXPath(xpath, timeout = 10000) {
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
                        reject(new Error(`等待 XPath 元素超时：${xpath}`));
                    }
                }
            }, interval);
        });
    }

    // 等待指定的 CSS 选择器元素出现在 DOM 中
    function waitForSelector(selector, timeout = 10000) {
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
                        reject(new Error(`等待选择器元素超时：${selector}`));
                    }
                }
            }, interval);
        });
    }

    // 主函数，执行自动化步骤
    async function main() {
        try {
            log('脚本开始执行。');

            // 确保页面已完全加载
            await new Promise(resolve => {
                if (document.readyState === 'complete') {
                    resolve();
                } else {
                    window.addEventListener('load', resolve);
                }
            });

            // 第一步：点击元素1
            const element1XPath = '//*[@id="main-container"]/div/div[1]/div/div[1]/button';
            const element1 = await waitForXPath(element1XPath);
            await randomDelay();
            element1.click();
            log('已点击元素1。');

            // 等待小窗口1出现
            const smallWindow1XPath = '/html/body/div[2]/div/section';
            await waitForXPath(smallWindow1XPath);
            log('小窗口1已出现。');

            // 随机点击元素2、3或4
            const elementsOptions = [
                '/html/body/div[2]/div/section/div[3]/div/div[1]',
                '/html/body/div[2]/div/section/div[3]/div/div[2]'
            ];
            const randomElementXPath = elementsOptions[Math.floor(Math.random() * elementsOptions.length)];
            const randomElement = await waitForXPath(randomElementXPath);
            await randomDelay();
            randomElement.click();
            log('已随机点击元素2、3或4之一。');

            // 点击元素5
            const element5XPath = '/html/body/div[2]/div/section/div[4]/button[2]';
            const element5 = await waitForXPath(element5XPath);
            await randomDelay();
            element5.click();
            log('已点击元素5。');

            // 第二步：在输入框中输入文本并点击元素6
            const inputBoxSelector = 'input[data-testid="chat-input"]';
            const sendButtonSelector = 'button[type="submit"]';

            const messages = [
                "What are the main features available in Launch in Studio for this agent, and how can users benefit from them?",
                "Could you provide an overview of the latest updates or insights shared by this agent on their X (Twitter) feed?",
                "What resources or guides are available through this agent's platform to support users' career development?",
                "How can I access and join the community on Discord for this agent, and what topics are commonly discussed there?",
                "What kind of industry insights or news does this agent publish on their Medium or Documentation platform?",
                "What makes this agent's approach to community building and user support unique within its field?",
                "Are there any standout features in Launch in Studio for users interested in exploring Web3 or blockchain-related jobs?",
                "How does this agent’s platform help companies and job seekers connect more effectively?",
                "What types of updates or announcements should I look out for from this agent on their social media channels?",
                "Could you describe the type of discussions and support available on this agent’s community platforms, such as Discord or X?"
            ];

            for (let i = 0; i < 15; i++) {
                // 等待输入框可用
                let inputBox = await waitForSelector(inputBoxSelector);
                while (inputBox.disabled || inputBox.readOnly) {
                    log('输入框不可用，等待中...');
                    await randomDelay(500, 1000);
                    inputBox = await waitForSelector(inputBoxSelector);
                }

                // 随机选择一条消息
                const randomMessage = messages[Math.floor(Math.random() * messages.length)];

                // 模拟打字
                log(`正在输入第 ${i + 1} 条消息："${randomMessage}"`);
                setNativeValue(inputBox, ''); // 清空输入框
                await simulateTyping(inputBox, randomMessage);

                // 点击发送按钮（元素6）
                const sendButton = await waitForSelector(sendButtonSelector);
                await randomDelay();
                sendButton.click();
                log('已点击发送按钮。');

                // 等待响应处理完毕，再发送下一条消息
                await waitForResponseToBeProcessed();
            }

            log('脚本执行完毕。');

        } catch (error) {
            console.error(`错误：${error.message}`);
        }
    }

    // 等待响应处理完毕，输入框可再次输入
    async function waitForResponseToBeProcessed() {
        // 根据网站实际情况调整此函数，例如检测是否有“正在输入”提示
        const sendButtonSelector = 'button[type="submit"]';
        let isProcessing = true;
        while (isProcessing) {
            const sendButton = await waitForSelector(sendButtonSelector);
            if (!sendButton.disabled) {
                isProcessing = false;
            } else {
                log('等待响应处理完毕...');
                await randomDelay(2000, 3000);
            }
        }
    }

    // 开始自动化
    main();
})();
