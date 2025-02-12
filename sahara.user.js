// ==UserScript==
// @name         Sahara Labs 自动化脚本 (宽松匹配 + 调试输出)
// @namespace    http://tampermonkey.net/
// @version      12.3
// @description  1) 无调试日志 2) 等待页面加载完成+额外等待 3) 并行监测切换元素/提交元素可点击, 点击后再次操作一
//               操作一：若 rawText 与 presetTexts(宽松匹配) => Disapprove；否则 Approve
// @match        https://app.saharalabs.ai/*
// @updateURL    https://github.com/slatwater/web3-/raw/refs/heads/main/sahara.user.js
// @downloadURL  https://github.com/slatwater/web3-/raw/refs/heads/main/sahara.user.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    /**
     * --------------------------
     *  1) 预设文本列表
     * --------------------------
     * 脚本以宽松方式检查：将 rawText 与数组内每个项目都做 normalizeStr，
     * 只要有完全相等(忽略标点/大小写/多空格/特殊字符)就视为匹配 => Disapprove
     */
    const presetTexts = [
        "cloudy rainbow",
        "Axolotyl",
        "Axolotl",
        "moonlight basket",
        "a friendly kitten",
        "talking dog",
        "flying carpet",
        "invisible car",
        "singing bird",
        "an adorable cat",
        "a fluffy bunny",
        "chocolate bar",
        "magic wand",
        "singing tree",
        "singing bird",
        "talking book",
        "dancing shoes",
        "dancing unicorn",
        "jumping beans",
        "jumping rainbow",
        "laughing clock",
        "cloud walker",
        "banana smoothie",
        "banana pillow",
        "Baking, Cooking, Eating",
        "Trains, Planes, Cars",
        "Sky is blue",
        "Random animals",
        "Mars, Venus, Jupiter",
        "Jumpingjack",
        "Mountains, Valleys, Hills",
        "Moonwalk, Flyme, Skyfall",
        "Dogs, Cats, Hamsters",
        "Waterfalls and Oceans",
        "Cats, Dogs, Birds",
        "Shoes, Hats, Coats",
        "Guessing random words",
        "A globe",
        "A shopping bag",
        "A recipe book",
        "A box of cereal",
        "A dog leash",
        "A vacuum cleaner",
        "A lamp post",
        "A gas station pump",
        "A box of cereal",
        "A roller coaster",
        "A playground slide",
        "A flagpole",
        "A TV",
        "A brick oven",
        "Mars, Stars, Comets",
        "Biking, Swimming, Flying",
        "Shoes, Bags, Belts",
        "No idea at all",
        "Jumbled letters",
        "Riding bikes is fun",
        "No clue at all",
        "Rainbows and Butterflies",
        "Flying kites",
        "abcdefg12345",
        "abcd1234",
        "Cars, Trucks, Buses",
        "Rainbow, Unicorn, Dragon",
        "Flowers, Trees, Grass",
        "Totally irrelevant",
        "Flying kites and clouds",
        "Flyingballoons",
        "Pizza tastes great",
        "Just random words",
        "Typing nonsense",
        "Trees, Mountains, Rivers",
        "Totally nonsense",
        "Invalid input",
        "Pineapple, Orange, Banana",
        "Space, Rocket, Satellite",
        "Sun, Moon, Stars",
        "Music, Movies, Games",
        "Jibberishagain",
        "Flowers, Animals, Fish",
        "Skyscrapers and Bridges",
        "Sky, Stars, Moon",
        "Birds, Insects, Mammals",
        "Invalid text",
        "Coffee, Tea, Water",
        "letter123",
        "Zebra stripes",
        "Elephants, Tigers, Lions",
        "A frying pan",
        "A paper shredder",
        "A dishwasher",
        "A fishing net",
        "A grocery shopping cart",
        "A treadmill",
        "A yoga mat",
        "A book",
        "A picnic basket",
        "A pillow",
        "An elephant",
        "A chef's hat",
        "A music stand",
        "A water bottle",
        "A soccer ball",
        "12345abcd",
        "A bottle of shampoo",
        "abcdefagain",
        "Flowers, Trees, Shrubs",
        "A bag of marbles",
        "A box of tissues",
        "Sunshine, Rain, Thunder",
        "A soda can",
        "Gibberish letters",
        "Zebra, Leopard, Cheetah",
        "A basketball",
        "A box of crayons",
        "A snow shovel",
        "A grocery store checkout counter",
        "A set of dumbbells",
        "A doorbell",
        "A kitchen sink",
        "A paper shredder",
        "A desktop computer",
        "A beach ball",
        "A fishing rod",
        "A full-length mirror",
        "A flower vase",
        "A wind turbine",
        "A medieval suit of armor",
        "A doghouse",
        "A fake clock",
        "A desk",
        "A coin-operated telescope",
        "A basketball hoop",
        "A skateboard",
        "A rocking chair",
        "A box of crayons",
        "A chair",
        "A basketball",
        "A birdhouse",
        "An elephant",
        "A crossword puzzle",
        "A garden hose",
        "A paper clip",
        "A glass of water",
        "A giant ice sculpture",
        "A popcorn machine",
        "A microwave",
        "A wooden table",
        "A TV remote",
        "A swimming pool ladder",
        "A taxidermy moose head",
        "A full-sized fridge",
        "A potted plant",
        "A dartboard",
        "A wool sweater",
        "A cutting board",
        "A potted plant",
        "A pet collar",
        "A fireplace",
        "A chessboard",
        "A skateboard ramp",
        "A giant pumpkin",
        "A hammer",
        "A grandfather clock",
        "A music sheet",
        "A carnival game booth",
        "A heavy steel anvil",
        "A gas station fuel pump",
        "A bag of concrete",
        "A wall clock",
        "A Christmas tree",
        "A giant stuffed bear",
        "A bag of frozen peas",
        "A washing machine",
        "A chandelier",
        "A wooden ladder",
        "A giant canvas painting",
        "A backpack",
        "A pack of playing cards",
        "A leather wallet",
        "A deck of cards",
        "A turtle",
        "A teapot",
        "A pair of sunglasses",
        "A wooden rocking chair",
        "A bookcase",
        "A satellite dish",
        "Letters123",
        "Unrelated text",
        "Spaceships and Aliens",
        "Cooking, Dancing, Painting",
        "Totally random words",
        "Elephants in the park",
        "randomtext",
        "Typingletters",
        "Skyfall, Moonlight, Sunshine",
        "123xyz",
        "ZYX987",
        "Books, Pens, Papers",
        "A spoon",
        "A fortune cookie",
        "A spinning top",
        "I like hiking",
        "A pair of jeans",
        "A snow globe",
        "A flower pot",
        "Rockets, Satellites, Planets",
        "Clouds, Rain, Thunder",
        "A blanket",
        "A shopping cart",
        "A painting",
        "A fortune cookie",
        "A violin",
        "A car mirror",
        "A stuffed animal",
        "A leaf blower",
        "A coat rack",
        "A chocolate bar",
        "A box of cerea",
        "A suitcase",
        "A speedboat",
        "A pair of mittens",
        "A bucket of paint",
        "A bouquet of flowers",
        "A garden gnome",
        "A gallon of milk",
        "A fireplace poker",
        "A park bench",
        "An external graphics card",
        "A soap",
        "A fruit basket",
        "A napkin holder",
        "A doormat",
        "A fridge magnet",
        "A candle",
        "A teddy bear",
        "A soap bar",
        "A decorative vase",
        "A kitchen",
        "A Hospital",
        "A mailbox",
        "A car battery",
        "A washing detergent",
        "A bicycle",
        "A bowling ball",
        "A surfboard",
        "A bag of coffee beans",
        "A measuring tape",
        "A refrigerator",
        "A boombox",
        "A rock",
        "A telephone booth",
        "A windmill",
        "A big heavy clock",
        "A vending machine",
        "A car tire",
        "A firestation",
        "A traffic cone",
        "A rubber duck",
        "A ladder",
        "an engine",
        "abcdef",
        "No idea",
        "Clouds are fluffy",
        "Typing nonsense",
        "asdfghjkl",
        "123wronginput"
        // ... 这里保留或添加更多您需要的文本
    ];

    /**
     * --------------------------
     *  2) 在页面 load 后启动
     * --------------------------
     */
    window.addEventListener('load', async function() {
        console.log("[脚本日志] 页面load, 等待额外5秒...");
        await sleep(5000);
        console.log("[脚本日志] 开始主流程 mainFlow...");
        mainFlow();
    });

    /**
     * --------------------------
     *  3) 主流程
     * --------------------------
     */
    async function mainFlow() {
        // (A) 先执行一次 operationOne
        await operationOne();

        // (B) 循环监测 => 切换/提交 => operationOne
        while(true) {
            let didAction = false;
            let startTime = Date.now();
            const maxTime = 100000; // 100秒

            while(true) {
                if (Date.now() - startTime >= maxTime) {
                    console.log("[脚本日志] 100秒内切换/提交都未可点击 => 结束脚本");
                    break;
                }

                // 检查“切换元素”
                const switchEl = document.querySelector(switchSelector);
                if (switchEl && isElementClickable(switchEl)) {
                    switchEl.scrollIntoView({behavior:"smooth", block:"center"});
                    await sleep(500);
                    switchEl.click();
                    console.log("[脚本日志] 已点击【切换元素】，再执行操作一...");
                    await sleep(1000);
                    await operationOne();
                    didAction = true;
                }

                // 检查“提交元素”
                const submitEl = document.querySelector(submitSelector);
                if (submitEl && isElementClickable(submitEl)) {
                    submitEl.scrollIntoView({behavior:"smooth", block:"center"});
                    await sleep(500);
                    submitEl.click();
                    console.log("[脚本日志] 已点击【提交元素】，等待确认元素...");

                    const confirmEl = await waitForElement(confirmSelector, 5000);
                    if (confirmEl) {
                        confirmEl.scrollIntoView({behavior:"smooth", block:"center"});
                        await sleep(500);
                        confirmEl.click();
                        console.log("[脚本日志] 已点击确认元素");
                    } else {
                        console.log("[脚本日志] 确认元素未出现(或超时)");
                    }

                    console.log("[脚本日志] 再次执行 operationOne...");
                    await sleep(1000);
                    await operationOne();
                    didAction = true;
                }

                if (didAction) break;
                await sleep(500);
            }

            if (!didAction) {
                console.log("[脚本日志] 未找到可点击切换/提交 => 结束脚本");
                break;
            }

            console.log("[脚本日志] 本轮已操作 => 进入下轮循环...");
        }

        console.log("[脚本日志] mainFlow结束，脚本结束");
    }

    /**
     * --------------------------
     *  4) operationOne => 遍历
     * --------------------------
     */
    async function operationOne() {
        console.log("[操作一] 开始遍历区域...");

        const allRegions = document.querySelectorAll(regionSelector);
        if (!allRegions || !allRegions.length) {
            console.log("[操作一] 未找到任何区域 => 结束");
            return;
        }
        console.log(`[操作一] 找到 ${allRegions.length} 个区域`);

        for (let i = 0; i < allRegions.length; i++) {
            const region = allRegions[i];
            console.log(`[操作一] 第 ${i+1} 个区域`);

            const textBaseEls = region.querySelectorAll('.text-baseV2');
            if (textBaseEls.length < 3) {
                console.log("[操作一] text-baseV2 < 3, 跳过");
                await sleep(800);
                continue;
            }

            // 取第3个
            const textEl = textBaseEls[2];
            const rawText = (textEl.innerText || '').trim();
            console.log(`[操作一] 文本原始= "${rawText}"`);
            
            // 调试: 打印其标准化结果
            const normRaw = normalizeStr(rawText);
            console.log(`[操作一] 文本标准化= "${normRaw}"`);

            // 判断 => Disapprove or Approve
            let buttonText;
            if (isInPresetTextsFuzzy(rawText, presetTexts)) {
                buttonText = 'Disapprove';
                console.log("[操作一] => 选 Disapprove");
            } else {
                buttonText = 'Approve';
                console.log("[操作一] => 选 Approve");
            }

            const btn = findButtonByText(region, buttonText);
            if (!btn) {
                console.log(`[操作一] 未找到按钮 "${buttonText}", 跳过`);
                await sleep(800);
                continue;
            }

            btn.scrollIntoView({behavior:"smooth", block:"center"});
            await sleep(500);
            btn.click();
            console.log(`[操作一] 已点击"${buttonText}" (rawText="${rawText}")`);
            await sleep(1000);
        }

        console.log("[操作一] 全部区域处理完毕");
    }

    // ========== 工具区 ==========

    /**
     * 判断是否可点击
     */
    function isElementClickable(el) {
        if (!el) return false;
        const cList = [...el.classList];
        if (cList.some(cls => cls.includes('cursor-not-allowed'))) return false;

        const style = window.getComputedStyle(el);
        if (style.pointerEvents === 'none') return false;

        if (el.hasAttribute('disabled')) return false;

        return true;
    }

    /**
     * 等待元素出现
     */
    async function waitForElement(selector, timeout=5000) {
        const start = Date.now();
        return new Promise(resolve => {
            const timer = setInterval(()=>{
                const found = document.querySelector(selector);
                if (found) {
                    clearInterval(timer);
                    resolve(found);
                } else if (Date.now() - start >= timeout) {
                    clearInterval(timer);
                    resolve(null);
                }
            }, 500);
        });
    }

    /**
     * 在容器内通过文本找按钮(忽略大小写)
     */
    function findButtonByText(container, targetText) {
        targetText = targetText.toLowerCase();
        const btns = container.querySelectorAll('button');
        for (const b of btns) {
            const bText = (b.textContent||'').trim().toLowerCase();
            if (bText === targetText) {
                return b;
            }
        }
        return null;
    }

    /**
     * sleep
     */
    function sleep(ms) {
        return new Promise(r => setTimeout(r, ms));
    }

    /**
     * 标准化字符串 => 宽松匹配
     *  - 全转小写
     *  - 去标点/特殊字符(仅保留字母数字空格)
     *  - 合并多余空格
     *  - trim()
     */
    function normalizeStr(str) {
        return str
            .toLowerCase()
            .replace(/[^\p{L}\p{N}\s]+/gu, '') 
            .replace(/\s+/g, ' ')
            .trim();
    }

    /**
     * 检查 rawText 是否在 presetArr(宽松)中
     */
    function isInPresetTextsFuzzy(raw, arr) {
        const normRaw = normalizeStr(raw);

        // 调试：输出所有 presetText 标准化
        console.log(`[调试] rawText标准化="${normRaw}"，开始比对预设...`);

        for (const pt of arr) {
            const normPt = normalizeStr(pt);
            if (normRaw === normPt) {
                console.log(`[调试] 匹配成功 => rawText("${normRaw}") == preset("${normPt}")`);
                return true;
            } else {
                // 若想查看所有不匹配的原因，可在这里调试:
                // console.log(`[调试] 不匹配 => rawText("${normRaw}") vs preset("${normPt}")`);
            }
        }
        return false;
    }

    // ========== 选择器 ==========

    const regionSelector = '#root > div > div > div > div > div > div > div.flex-1.overflow-auto > div > div > div.pt-5.h-full.px-4.pb-2.w-\\[45\\%\\].overflow-y-auto.\\!h-\\[calc\\(100vh-66px-46px\\)\\] > div > div:nth-child(n) > div';
    const switchSelector = '#root > div > div > div > div > div > div > div.w-full.relative.bg-saBgContainerDeep.px-6.flex.justify-between.h-\\[66px\\].items-center.border-b.border-solid.border-saBorderOnContainerDeep > div.sa-v3-space.css-9ub2fh.sa-v3-space-horizontal.sa-v3-space-align-center > div:nth-child(2) > div > div:nth-child(3) > div > div';
    const submitSelector = '#labeling-submit-button-id > div.w-full.h-\\[40px\\].select-none.flex-shrink-0.flex.font-medium.justify-center.cursor-pointer.items-center.rounded-\\[8px\\].text-saPrimaryBg.bg-saPrimaryPrimary.text-base.border-solid.border.border-saPrimaryPrimary.hover\\:bg-saPrimaryHover.\\!w-\\[auto\\].\\!h-8.px-\\[15px\\].\\!py-\\[6\\.4px\\]';
    const confirmSelector = '.sa-v3-modal-wrap.sa-v3-modal-confirm-centered.sa-v3-modal-centered .sa-v3-modal-confirm-btns > div > div:nth-child(2) > div';

})();
