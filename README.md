# Qian-Sai · 2026 FPGA 赛题资料

全国大学生嵌入式芯片与系统设计竞赛 2026 **FPGA 创新设计赛道**资料整理，包含 7 家企业、24 项一级选题、139 页官方选题指南。

资料核对日期：**2026-09-07**。本项目是非官方选题辅助资料，范围依据 FPGA 选题指南合集，不涵盖该竞赛的其他赛道。

## 在线阅读

- [赛题可视化：企业筛选、方向矩阵、选题对比](https://nbstarhkc.github.io/Qian-Sai/)
- [139 页全文：检索、跳页、图片文字对照](https://nbstarhkc.github.io/Qian-Sai/fulltext.html)
- [选题解读 Markdown](fpga-2026-guide.md)
- [全文核对记录](fulltext-audit.md)
- [合并全文 TXT](fpga-2026-fulltext.txt)
- [完整资料包 ZIP](https://nbstarhkc.github.io/Qian-Sai/fpga-2026-fulltext.zip)

下载后可直接用浏览器打开 `index.html` 或 `embedded-2026.html`，无需安装依赖或启动服务器。全文阅读入口为 `fulltext.html`。

## 企业指南

| 企业 | 一级选题 | PDF 页数 | 官方原件 | 逐页全文 |
| --- | ---: | ---: | --- | --- |
| AMD | 3 | 28 | [PDF](sources/amd.pdf) | [TXT](fulltext/amd.txt) |
| 紫光同创 | 4 | 17 | [PDF](sources/pango.pdf) | [TXT](fulltext/pango.txt) |
| 安路科技 | 5 | 35 | [PDF](sources/anlogic.pdf) | [TXT](fulltext/anlogic.txt) |
| 高云半导体 | 4 | 22 | [PDF](sources/gowin.pdf) | [TXT](fulltext/gowin.txt) |
| 易灵思 | 5 | 21 | [PDF](sources/efinix.pdf) | [TXT](fulltext/efinix.txt) |
| 复旦微 | 1 | 8 | [PDF](sources/fudan.pdf) | [TXT](fulltext/fudan.txt) |
| 中科亿海微 | 2 | 8 | [PDF](sources/ehi.pdf) | [TXT](fulltext/ehi.txt) |

AMD 内部的 RTL/HLS 分榜、初级/高级分组不重复计数；复旦微作为一个开放方向统计，页面题名为内容概括。

## 原文与解读

- `topics.js` 与 `fpga-2026-guide.md` 是对官方要求的归纳，包含基础任务、扩展、指标、交付物和注意事项；备赛建议另有标注。
- `fulltext/*.txt` 保留 PDF 文字层全文和实际页码，含封面、目录、平台参数、赛题、评分和附注。`*-layout.txt` 为保留空间布局的提取版本。
- 41 个图片区域保留在 `fulltext/images/`。其中 17 个图的主要标注或表格已对图转录，见 [图片文字补充](fulltext/image-transcriptions.txt)。
- [原始 OCR](fulltext/ocr-raw.txt) 可能含误识别、漏字和二维码噪声，不能视作已校对正文。细小器件丝印和遮挡文字不保证完整准确。
- 原始错字、页眉年份和型号差异未在全文中擅自修正。表格提取可能改变列顺序，请结合 PDF 与图片对照。
- [文件清单](fulltext/manifest.json) 包含页数、逐页字符数和原 PDF 的 SHA-256。

## 文件结构

```text
index.html                 网站入口
embedded-2026.html          赛题可视化
app.js / styles.css         可视化交互与样式
theme.css                  通用配色、字体与控件样式
vendor/                    本地图标库及许可证
topics.js                  7 家企业与 24 项选题数据
fulltext.html              逐页全文与图片对照
fulltext.js / fulltext.css  全文检索与样式
fulltext/                  分企业全文、布局版、图片、OCR、清单
sources/                   官方 PDF 与版本索引
assets/                    指南封面
fpga-2026-guide.md          选题解读
fpga-2026-fulltext.txt      合并全文
fpga-2026-fulltext.zip      可离线使用的完整资料包
fulltext-audit.md           核对记录与原文疑义
```

## 来源

- [用户提供的 2026 FPGA 选题指南合集](https://mp.weixin.qq.com/s/QrSgf1xQWhxGrn9ORjiMZw)
- [竞赛官网下载中心](http://www.fpgachina.cn/?page=download)
- [第一轮通知](sources/notice.pdf)

正式资格、评分、截止日期及后续变更以组委会和企业最新通知为准。原始 PDF、板卡图片、商标及第三方资料的权利归各原发布方；本仓库的整理不改变其原有权利和使用条件。

图标使用 [Lucide](https://lucide.dev/) 0.468.0，本地分发版本及许可证见 `vendor/`。
