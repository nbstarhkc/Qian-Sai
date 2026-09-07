# 2026 FPGA 选题指南全文核对记录

核对日期：2026-09-07。范围为用户提供的 FPGA 指南合集中的七家企业，覆盖 24 项一级选题。

7 份 PDF 共 139 页，逐页提取文字层 96,066 个字符（含空格、换行、页眉页脚）；每页均有文字层内容。

另处理 41 个较大图片区域（含重复图片、板卡照片和二维码），其中 17 个图的主要标注或表格做了对图转录。全部图片与原始 OCR 均保留。

[全文阅读与逐页图片对照](fulltext.html) · [合并全文 TXT](fpga-2026-fulltext.txt) · [图片文字补充](fulltext/image-transcriptions.txt) · [原始 OCR](fulltext/ocr-raw.txt) · [可视化选题解读](embedded-2026.html)

| 企业 | 文件版本 | PDF 页数 | 文字层字符 | 图片区域 | 逐页全文 |
| --- | --- | ---: | ---: | ---: | --- |
| AMD | 2026-08-31 | 28 | 28,341 | 2 | [TXT](fulltext/amd.txt) / [布局版](fulltext/amd-layout.txt) / [PDF](sources/amd.pdf) |
| 紫光同创 | 2026-08-29 | 17 | 10,200 | 11 | [TXT](fulltext/pango.txt) / [布局版](fulltext/pango-layout.txt) / [PDF](sources/pango.pdf) |
| 安路科技 | 2026-09-02 | 35 | 22,037 | 8 | [TXT](fulltext/anlogic.txt) / [布局版](fulltext/anlogic-layout.txt) / [PDF](sources/anlogic.pdf) |
| 高云半导体 | 2026-08-24 | 22 | 9,209 | 14 | [TXT](fulltext/gowin.txt) / [布局版](fulltext/gowin-layout.txt) / [PDF](sources/gowin.pdf) |
| 易灵思 | 2026-09-02 | 21 | 14,582 | 4 | [TXT](fulltext/efinix.txt) / [布局版](fulltext/efinix-layout.txt) / [PDF](sources/efinix.pdf) |
| 复旦微 | 2026-08-22 | 8 | 6,243 | 2 | [TXT](fulltext/fudan.txt) / [布局版](fulltext/fudan-layout.txt) / [PDF](sources/fudan.pdf) |
| 中科亿海微 | 2026-08-22 | 8 | 5,454 | 0 | [TXT](fulltext/ehi.txt) / [布局版](fulltext/ehi-layout.txt) / [PDF](sources/ehi.pdf) |

## 已核对的内容

七份指南的文字层全文已逐份读取，包括公司介绍、平台参数、所有选题条款、基础与高阶要求、评分、交付、板卡获取、技术支持和附注。赛题解读仍属于归纳，逐页 TXT 才是完整文字层转写。

41 个图片区域均已 OCR 并查看图像。紫光同创第 8 页 SOPC 规格表为图片，已逐行核对补录；主要板卡接口图、倒立摆框图和交流群文字也已补录。未将板卡照片中的细小器件丝印、遮挡文字或二维码图案认作已准确转出的正文。

## 影响解读的细节

- 安路题三、题四各有六项硬性交付，不能用后面的某个简单级场景替代；题三传输延迟大于 50ms 有酌情扣分条款（第 25 页）。
- 易灵思题三明确至少实现两项系统优化与拓展；题一采集帧率、推理帧率和 HDMI 输出帧率是三种不同指标。
- 高云乐器题禁止以预录 PCM 或整段录音触发代替 FPGA 实时合成。
- 中科亿海微 PMUX 有任一用例不等价时，其余评分项不予计分。
- 易灵思第 4 页配图写 Ti60F255，同页正文及板卡丝印写 Ti60F225；图片转录保留差异，选板须核对实物手册。

## 原文保留与局限

- 安路部分平台页页眉写 2025，而封面和赛题正文为 2026；第 9 页与第 19 页对 RK3576 CPU 的描述不一致。
- AMD 指南写 ROCm 7.14.0 及以上；中科亿海微同时给出 eLinx 与 Yosys/EQY 要求，仍需企业澄清工具衔接。
- PDF 中的错别字、书签错误、重复页脚和疑义没有在原文 TXT 中擅自修正。
- 文字层提取可能改变表格的阅读顺序；提供布局版 TXT，并保留原 PDF。扫描图片 OCR 有误识别，已核对的图片转录与原始 OCR 分开。
- 图片区域统计以宽度至少 35 PDF 点、高度至少 20 PDF 点的嵌入图片为界，不代表对每个微小图形都做了识别；二维码未解码。
- manifest.json 保存每页字符数和原 PDF SHA-256，支持核查页数和文件一致性。
