---
title: css常用动画效果
date: 2022-07-08
tags:
  - css
---文字跳动

**HTML**

``` stylus

    <div class="bounce">
        <span class="letter">n</span>
        <span class="letter">e</span>
        <span class="letter">w</span>

    </div>
```
**CSS**

``` stylus
        html,
        body {
            width: 100%;
            height: 100%;
            margin: 0;
            background: #2d303a;
            overflow: hidden;
        }

        .bounce {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            color: white;
            height: 100%;
            font: normal bold 6rem "Product Sans", sans-serif;
            white-space: nowrap;
        }

        .letter {
            animation: bounce .3s cubic-bezier(0.05, 0, 0.2, 1) infinite alternate;
            display: inline-block;
            transform: translate3d(0, 0, 0);
            margin-top: 0.5em;
            text-shadow: rgba(255, 255, 255, 0.4) 0 0 0.05em;
            font: normal 500 6rem 'Varela Round', sans-serif;
        }

        .letter:nth-child(1) {
            animation-delay: 0s;
        }

        .letter:nth-child(2) {
            animation-delay: 0.2s;
        }

        .letter:nth-child(3) {
            animation-delay: 0.3s;
        }

        @keyframes bounce {
            0% {
                transform: translateY(0em)
                /* text-shadow: rgba(255, 255, 255, 0.4) 0 0 0.05em; */
            }

            100% {
                transform: translateY(-0.05em)
                /* text-shadow: rgba(255, 255, 255, 0.4) 0 1em 0.35em; */
            }
        }
```
