#!/usr/bin/env node
/**
 * 提取万界夺舍录_女性视角.json中的世界书和前端数据
 */

const fs = require('fs');
const path = require('path');

function extractCharacterBook(data, outputDir) {
    const characterBook = data.data?.character_book || {};
    const entries = characterBook.entries || [];
    
    console.log(`找到 ${entries.length} 个世界书条目`);
    
    // 创建世界书输出目录
    const bookDir = path.join(outputDir, 'character_book');
    if (!fs.existsSync(bookDir)) {
        fs.mkdirSync(bookDir, { recursive: true });
    }
    
    // 提取每个条目
    entries.forEach(entry => {
        const entryId = entry.id || 'unknown';
        const comment = entry.comment || `entry_${entryId}`;
        const content = entry.content || '';
        
        // 清理文件名
        let safeName = comment.replace(/[^a-zA-Z0-9\u4e00-\u9fa5\s\-_]/g, '').trim();
        if (!safeName) {
            safeName = `entry_${entryId}`;
        }
        
        // 保存为单独文件
        const outputFile = path.join(bookDir, `${safeName}.md`);
        let output = `# ${comment}\n\n`;
        output += `**ID:** ${entryId}\n\n`;
        output += `**启用状态:** ${entry.enabled || false}\n\n`;
        output += `**位置:** ${entry.position || 'unknown'}\n\n`;
        output += `**插入顺序:** ${entry.insertion_order || 0}\n\n`;
        output += `## 内容\n\n`;
        output += content;
        
        fs.writeFileSync(outputFile, output, 'utf8');
        console.log(`  已提取: ${safeName}.md`);
    });
    
    // 保存完整的世界书JSON
    const bookJsonFile = path.join(bookDir, 'character_book_full.json');
    fs.writeFileSync(bookJsonFile, JSON.stringify(characterBook, null, 2), 'utf8');
    console.log(`完整世界书已保存: ${bookJsonFile}`);
}

function extractRegexScripts(data, outputDir) {
    const extensions = data.data?.extensions || {};
    const regexScripts = extensions.regex_scripts || [];
    
    console.log(`找到 ${regexScripts.length} 个正则脚本`);
    
    // 创建前端脚本输出目录
    const frontendDir = path.join(outputDir, 'frontend_scripts');
    if (!fs.existsSync(frontendDir)) {
        fs.mkdirSync(frontendDir, { recursive: true });
    }
    
    // 提取每个脚本
    regexScripts.forEach(script => {
        const scriptId = script.id || 'unknown';
        const scriptName = script.scriptName || `script_${scriptId}`;
        const findRegex = script.findRegex || '';
        const replaceString = script.replaceString || '';
        
        // 清理文件名
        let safeName = scriptName.replace(/[^a-zA-Z0-9\u4e00-\u9fa5\s\-_]/g, '').trim();
        if (!safeName) {
            safeName = `script_${scriptId}`;
        }
        
        // 保存脚本内容
        const outputFile = path.join(frontendDir, `${safeName}.md`);
        let output = `# ${scriptName}\n\n`;
        output += `**ID:** ${scriptId}\n\n`;
        output += `**启用状态:** ${!script.disabled}\n\n`;
        output += `**Markdown Only:** ${script.markdownOnly || false}\n\n`;
        output += `**Prompt Only:** ${script.promptOnly || false}\n\n`;
        output += `**Run On Edit:** ${script.runOnEdit || false}\n\n`;
        output += `**Placement:** ${JSON.stringify(script.placement || [])}\n\n`;
        output += `## 查找正则\n\n`;
        output += `\`\`\`regex\n${findRegex}\n\`\`\`\n\n`;
        output += `## 替换字符串\n\n`;
        
        if (replaceString) {
            // 检查是否是HTML内容
            if (replaceString.trim().startsWith('```html')) {
                output += '```html\n';
                // 提取HTML内容（去掉开头的```html和结尾的```）
                let htmlContent = replaceString.trim();
                if (htmlContent.startsWith('```html')) {
                    htmlContent = htmlContent.substring(7);
                }
                if (htmlContent.endsWith('```')) {
                    htmlContent = htmlContent.substring(0, htmlContent.length - 3);
                }
                output += htmlContent.trim();
                output += '\n```\n';
            } else {
                output += '```\n';
                output += replaceString;
                output += '\n```\n';
            }
        } else {
            output += '*空替换*\n';
        }
        
        fs.writeFileSync(outputFile, output, 'utf8');
        console.log(`  已提取: ${safeName}.md`);
    });
    
    // 保存完整的前端脚本JSON
    const frontendJsonFile = path.join(frontendDir, 'regex_scripts_full.json');
    fs.writeFileSync(frontendJsonFile, JSON.stringify(regexScripts, null, 2), 'utf8');
    console.log(`完整前端脚本已保存: ${frontendJsonFile}`);
}

function main() {
    // 设置路径
    const baseDir = path.join('E:', 'Work', 'ai小说', 'ai_qianduan');
    const jsonFile = path.join(baseDir, 'src', '女性视角', '万界夺舍录_女性视角.json');
    const outputDir = path.join(baseDir, 'extracted');
    
    // 确保输出目录存在
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    console.log(`读取文件: ${jsonFile}`);
    
    // 读取JSON文件
    const data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
    console.log(`文件读取成功，角色名: ${data.name || 'unknown'}`);
    
    // 提取世界书
    console.log('\n=== 提取世界书数据 ===');
    extractCharacterBook(data, outputDir);
    
    // 提取前端脚本
    console.log('\n=== 提取前端脚本数据 ===');
    extractRegexScripts(data, outputDir);
    
    console.log('\n提取完成！');
    console.log(`输出目录: ${outputDir}`);
}

main();
