#!/usr/bin/env python3
"""
提取万界夺舍录_女性视角.json中的世界书和前端数据
"""

import json
import os
from pathlib import Path

def extract_character_book(data, output_dir):
    """提取世界书数据"""
    character_book = data.get('data', {}).get('character_book', {})
    entries = character_book.get('entries', [])
    
    print(f"找到 {len(entries)} 个世界书条目")
    
    # 创建世界书输出目录
    book_dir = output_dir / 'character_book'
    book_dir.mkdir(exist_ok=True)
    
    # 提取每个条目
    for entry in entries:
        entry_id = entry.get('id', 'unknown')
        comment = entry.get('comment', f'entry_{entry_id}')
        content = entry.get('content', '')
        
        # 清理文件名
        safe_name = "".join(c for c in comment if c.isalnum() or c in (' ', '-', '_')).strip()
        if not safe_name:
            safe_name = f'entry_{entry_id}'
        
        # 保存为单独文件
        output_file = book_dir / f'{safe_name}.md'
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(f'# {comment}\n\n')
            f.write(f'**ID:** {entry_id}\n\n')
            f.write(f'**启用状态:** {entry.get("enabled", False)}\n\n')
            f.write(f'**位置:** {entry.get("position", "unknown")}\n\n')
            f.write(f'**插入顺序:** {entry.get("insertion_order", 0)}\n\n')
            f.write('## 内容\n\n')
            f.write(content)
        
        print(f'  已提取: {safe_name}.md')
    
    # 保存完整的世界书JSON
    book_json_file = book_dir / 'character_book_full.json'
    with open(book_json_file, 'w', encoding='utf-8') as f:
        json.dump(character_book, f, ensure_ascii=False, indent=2)
    
    print(f'完整世界书已保存: {book_json_file}')

def extract_regex_scripts(data, output_dir):
    """提取前端正则脚本"""
    extensions = data.get('data', {}).get('extensions', {})
    regex_scripts = extensions.get('regex_scripts', [])
    
    print(f"找到 {len(regex_scripts)} 个正则脚本")
    
    # 创建前端脚本输出目录
    frontend_dir = output_dir / 'frontend_scripts'
    frontend_dir.mkdir(exist_ok=True)
    
    # 提取每个脚本
    for script in regex_scripts:
        script_id = script.get('id', 'unknown')
        script_name = script.get('scriptName', f'script_{script_id}')
        find_regex = script.get('findRegex', '')
        replace_string = script.get('replaceString', '')
        
        # 清理文件名
        safe_name = "".join(c for c in script_name if c.isalnum() or c in (' ', '-', '_')).strip()
        if not safe_name:
            safe_name = f'script_{script_id}'
        
        # 保存脚本内容
        output_file = frontend_dir / f'{safe_name}.md'
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(f'# {script_name}\n\n')
            f.write(f'**ID:** {script_id}\n\n')
            f.write(f'**启用状态:** {script.get("disabled", True)}\n\n')
            f.write(f'**Markdown Only:** {script.get("markdownOnly", False)}\n\n')
            f.write(f'**Prompt Only:** {script.get("promptOnly", False)}\n\n')
            f.write(f'**Run On Edit:** {script.get("runOnEdit", False)}\n\n')
            f.write(f'**Placement:** {script.get("placement", [])}\n\n')
            f.write('## 查找正则\n\n')
            f.write(f'```regex\n{find_regex}\n```\n\n')
            f.write('## 替换字符串\n\n')
            if replace_string:
                # 检查是否是HTML内容
                if replace_string.strip().startswith('```html'):
                    f.write('```html\n')
                    # 提取HTML内容（去掉开头的```html和结尾的```）
                    html_content = replace_string.strip()
                    if html_content.startswith('```html'):
                        html_content = html_content[7:]
                    if html_content.endswith('```'):
                        html_content = html_content[:-3]
                    f.write(html_content.strip())
                    f.write('\n```\n')
                else:
                    f.write('```\n')
                    f.write(replace_string)
                    f.write('\n```\n')
            else:
                f.write('*空替换*\n')
        
        print(f'  已提取: {safe_name}.md')
    
    # 保存完整的前端脚本JSON
    frontend_json_file = frontend_dir / 'regex_scripts_full.json'
    with open(frontend_json_file, 'w', encoding='utf-8') as f:
        json.dump(regex_scripts, f, ensure_ascii=False, indent=2)
    
    print(f'完整前端脚本已保存: {frontend_json_file}')

def main():
    # 设置路径
    base_dir = Path(r'E:\Work\ai小说\ai_qianduan')
    json_file = base_dir / 'src' / '女性视角' / '万界夺舍录_女性视角.json'
    output_dir = base_dir / 'extracted'
    
    # 确保输出目录存在
    output_dir.mkdir(exist_ok=True)
    
    print(f'读取文件: {json_file}')
    
    # 读取JSON文件
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    print(f'文件读取成功，角色名: {data.get("name", "unknown")}')
    
    # 提取世界书
    print('\n=== 提取世界书数据 ===')
    extract_character_book(data, output_dir)
    
    # 提取前端脚本
    print('\n=== 提取前端脚本数据 ===')
    extract_regex_scripts(data, output_dir)
    
    print('\n提取完成！')
    print(f'输出目录: {output_dir}')

if __name__ == '__main__':
    main()
