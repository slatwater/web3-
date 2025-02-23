// ==UserScript==
// @name         Sahara Labs 宽松政策
// @namespace    http://tampermonkey.net/
// @version      13.8
// @description  1) 无调试日志 2) 等待页面加载完成+额外等待 3) 并行监测切换元素/提交元素可点击, 点击后再次操作一
//               操作一：根据rawText是否属于预设文本 => Disapprove / Otherwise => Approve
// @match        https://app.saharalabs.ai/*
// @updateURL    https://github.com/slatwater/web3-/raw/refs/heads/main/sahara.user.js
// @downloadURL  https://github.com/slatwater/web3-/raw/refs/heads/main/sahara.user.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // -------------------------------
    // 1) 预设文本列表
    // -------------------------------
    // 若(标准化后) rawText 在此列表(也标准化后)中 => Disapprove；否则 Approve
    const presetTexts = [
        "cloudy rainbow",
        "Axolotyl",
        "Axolotl",
        "moonlight basket",
        "a friendly kitten",
        "talking dog",
        "A super heavy printer",
        "Care engine",
        "randomtext123",
        "1place2wrong",
        "sdljflj123",
        "elephantparadise33",
        "flying carpet",
        "Laptop, Phone, Tablet",
        "Swimming is fun",
        "invisible car",
        "singing bird",
        "Invalidresponse",
        "an adorable cat",
        "A heavy steel",
        "a fluffy bunny",
        "chocolate bar",
        "magic wand",
        "singing tree",
        "A tire cleaner",
        "singing bird",
        "talking book",
        "dancing shoes",
        "A steel suit of armor",
        "A tire swing",
        "Cars, Bikes, Boats",
        "noidea33"<
        "A remote-controlled car",
        "dancing unicorn",
        "A mirror that is larger than your body",
        "jumping beans",
        "jumping rainbow",
        "laughing clock",
        "A large airconditioner",
        "A brick",
        "cloud walker",
        "A basketball cleaner",
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
        "I like pizza",
        "Laptop, Phone, Tablet",
        "Swimming is fun",
        "Dogs, Cats, Hamsters",
        "Waterfalls and Oceans",
        "Cats, Dogs, Birds",
        "Shoes, Hats, Coats",
        "Guessing random words",
        "A museum",
        "A home fridge",
        "A globe",
        "A shopping bag",
        "A lawnmower",
        "1000 gallon of milk",
        "A tea kettle",
        "A big school building",
        "A large Christmas tree",
        "A recipe book",
        "A box of cereal",
        "A dog leash",
        "A vacuum cleaner",
        "A lamp post",
        "A gas station pump",
        "A tire swing",
        "A remote-controlled car",
        "A bag of groceries",
        "pen",
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
        "",
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
        "A wind chime",
        "A dining table",
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
    ];

    // -------------------------------
    // 2) 页面载入后开始执行
    // -------------------------------
    window.addEventListener('load', async function() {
        console.log("[脚本日志] 页面load事件已触发，等待额外5秒确保元素渲染...");
        await sleep(8000);

        console.log("[脚本日志] 开始主流程 mainFlow...");
        mainFlow();
    });

    // -------------------------------
    // 3) 主流程
    // -------------------------------
    async function mainFlow() {
        // (A) 先执行一次操作一
        await operationOne();

        // (B) 循环监测 => 如果“切换元素”或“提交元素”可点击 => 做相应操作
        while(true) {
            let didAction = false;
            let startTime = Date.now();
            const maxTime = 100000; // 100秒上限

            while(true) {
                if (Date.now() - startTime >= maxTime) {
                    console.log("[脚本日志] 100秒内切换/提交都未可点击 => 结束脚本");
                    break;
                }

                // 先检查“切换元素”
                const switchEl = document.querySelector(switchSelector);
                if (switchEl && isElementClickable(switchEl)) {
                    console.log("[脚本日志] 检测到【切换元素】可点击 => 点击...");
                    switchEl.scrollIntoView({behavior:"smooth", block:"center"});
                    await sleep(500);
                    switchEl.click();
                    console.log("[脚本日志] 已点击【切换元素】，再执行操作一...");
                    await sleep(1000);
                    await operationOne();
                    didAction = true;
                }

                // 再检查“提交元素”
                const submitEl = document.querySelector(submitSelector);
                if (submitEl && isElementClickable(submitEl)) {
                    console.log("[脚本日志] 检测到【提交元素】可点击 => 点击...");
                    submitEl.scrollIntoView({behavior:"smooth", block:"center"});
                    await sleep(500);
                    submitEl.click();
                    console.log("[脚本日志] 已点击【提交元素】，等待确认元素...");

                    // 等待确认元素出现
                    const confirmEl = await waitForElement(confirmSelector, 5000);
                    if (confirmEl) {
                        console.log("[脚本日志] 确认元素已出现 => 点击...");
                        confirmEl.scrollIntoView({behavior:"smooth", block:"center"});
                        await sleep(500);
                        confirmEl.click();
                        console.log("[脚本日志] 已点击确认元素");
                    } else {
                        console.log("[脚本日志] 等待确认元素超时或未出现");
                    }

                    console.log("[脚本日志] 再执行操作一...");
                    await sleep(1000);
                    await operationOne();
                    didAction = true;
                }

                if (didAction) break;
                await sleep(500);
            }

            if (!didAction) {
                console.log("[脚本日志] 未找到可点击切换/提交元素 => 脚本结束");
                break;
            }

            console.log("[脚本日志] 本轮已执行动作 => 再次进入下轮循环...");
        }

        console.log("[脚本日志] mainFlow结束，脚本彻底完成");
    }

    // -------------------------------
    // 4) operationOne: 遍历区域 => Approve or Disapprove
    // -------------------------------
    async function operationOne() {
        console.log("[操作一] 开始遍历区域...");

        const allRegions = document.querySelectorAll(regionSelector);
        if (!allRegions || !allRegions.length) {
            console.log("[操作一] 未找到任何区域 => 结束操作一");
            return;
        }
        console.log(`[操作一] 找到 ${allRegions.length} 个区域`);

        for (let i = 0; i < allRegions.length; i++) {
            const region = allRegions[i];
            console.log(`[操作一] 第${i+1}个区域`);

            const textBaseEls = region.querySelectorAll('.text-baseV2');
            if (textBaseEls.length < 3) {
                console.log("[操作一] text-baseV2<3, 跳过该区域");
                await sleep(800);
                continue;
            }

            // 取第3个
            const textEl = textBaseEls[2];
            const rawText = (textEl.innerText || '').trim();
            console.log(`[操作一] 文本="${rawText}"`);

            // 宽松匹配: 若rawText与预设文本(经normalize)匹配 => Disapprove, 否则 Approve
            let buttonText;
            if (isInPresetTextsFuzzy(rawText, presetTexts)) {
                buttonText = 'Disapprove';
            } else {
                buttonText = 'Approve';
            }

            const btn = findButtonByText(region, buttonText);
            if (!btn) {
                console.log(`[操作一] 未找到"${buttonText}"按钮, 跳过`);
                await sleep(800);
                continue;
            }

            btn.scrollIntoView({behavior:"smooth", block:"center"});
            await sleep(500);
            btn.click();
            console.log(`[操作一] 已点击"${buttonText}"按钮 (文本="${rawText}")`);
            await sleep(1000);
        }

        console.log("[操作一] 全部区域处理完毕");
    }

    // -------------------------------
    // 5) 工具函数: 判断元素可点击
    // -------------------------------
    function isElementClickable(el) {
        if (!el) return false;
        const cList = [...el.classList];
        if (cList.some(cls => cls.includes('cursor-not-allowed'))) return false;

        const style = window.getComputedStyle(el);
        if (style.pointerEvents === 'none') return false;

        if (el.hasAttribute('disabled')) return false;

        return true;
    }

    // -------------------------------
    // 6) 工具函数: 等待元素出现
    // -------------------------------
    async function waitForElement(selector, timeout=5000) {
        const start = Date.now();
        return new Promise(resolve => {
            const timer = setInterval(()=>{
                const found = document.querySelector(selector);
                if (found) {
                    clearInterval(timer);
                    resolve(found);
                } else if (Date.now()-start >= timeout) {
                    clearInterval(timer);
                    resolve(null);
                }
            },500);
        });
    }

    // -------------------------------
    // 7) 工具函数: 在容器内通过文本找按钮(忽略大小写)
    // -------------------------------
    function findButtonByText(container, targetText) {
        targetText = targetText.toLowerCase();
        const btns = container.querySelectorAll('button');
        for (const b of btns) {
            const bText = (b.textContent || '').trim().toLowerCase();
            if (bText === targetText) return b;
        }
        return null;
    }

    // -------------------------------
    // 8) 对字符串做宽松/标准化处理后匹配
    // -------------------------------
    function normalizeStr(str) {
        return str
            .toLowerCase()
            // 去除标点符号、特殊字符(仅保留字母数字空格)
            .replace(/[^\p{L}\p{N}\s]+/gu, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function isInPresetTextsFuzzy(raw, arr) {
        const normRaw = normalizeStr(raw);
        return arr.some(txt => normalizeStr(txt) === normRaw);
    }

    // -------------------------------
    // 9) sleep函数
    // -------------------------------
    function sleep(ms) {
        return new Promise(r => setTimeout(r, ms));
    }

    // -------------------------------
    // 10) 选择器
    // -------------------------------
    const regionSelector = '#root > div > div > div > div > div > div > div.flex-1.overflow-auto > div > div > div.pt-5.h-full.px-4.pb-2.w-\\[45\\%\\].overflow-y-auto.\\!h-\\[calc\\(100vh-66px-46px\\)\\] > div > div:nth-child(n) > div';
    const switchSelector = '#root > div > div > div > div > div > div > div.w-full.relative.bg-saBgContainerDeep.px-6.flex.justify-between.h-\\[66px\\].items-center.border-b.border-solid.border-saBorderOnContainerDeep > div.sa-v3-space.css-9ub2fh.sa-v3-space-horizontal.sa-v3-space-align-center > div:nth-child(2) > div > div:nth-child(3) > div > div';
    const submitSelector = '#labeling-submit-button-id > div.w-full.h-\\[40px\\].select-none.flex-shrink-0.flex.font-medium.justify-center.cursor-pointer.items-center.rounded-\\[8px\\].text-saPrimaryBg.bg-saPrimaryPrimary.text-base.border-solid.border.border-saPrimaryPrimary.hover\\:bg-saPrimaryHover.\\!w-\\[auto\\].\\!h-8.px-\\[15px\\].\\!py-\\[6\\.4px\\]';
    const confirmSelector = '.sa-v3-modal-wrap.sa-v3-modal-confirm-centered.sa-v3-modal-centered .sa-v3-modal-confirm-btns > div > div:nth-child(2) > div';

})();
