import { WeekContent } from './types';

export const learningContent: WeekContent[] = [
  {
    week: 1,
    title: 'Python基础',
    description: '掌握Python编程基础，包括环境搭建、数据类型、数据结构、流程控制和函数',
    days: [
      {
        day: 1,
        week: 1,
        title: '环境搭建',
        coreContent: [
          'Anaconda安装与环境配置',
          'Jupyter Notebook使用',
          'Python基础语法',
          '运行第一个程序'
        ],
        practiceTask: '安装Anaconda并运行Hello World程序',
        codeExample: `# 第一天：Hello World
print("Hello, Python!")
print("欢迎来到Python数据分析学习！")

# 变量赋值
name = "数据分析学习"
days = 30
print(f"开始{name}，共{days}天")`
      },
      {
        day: 2,
        week: 1,
        title: '数据类型',
        coreContent: [
          '整数(int)与浮点数(float)',
          '字符串(str)操作',
          '布尔值(bool)',
          '类型转换'
        ],
        practiceTask: '练习数据类型之间的转换',
        codeExample: `# 数据类型示例
# 整数
age = 25
print(f"年龄: {age}, 类型: {type(age)}")

# 浮点数
height = 1.75
print(f"身高: {height}, 类型: {type(height)}")

# 字符串
name = "Python"
print(f"字符串切片: {name[0:3]}")  # Pyt
print(f"字符串方法: {name.upper()}")  # PYTHON

# 类型转换
num_str = "123"
num_int = int(num_str)
print(f"转换后: {num_int + 10}")  # 133`
      },
      {
        day: 3,
        week: 1,
        title: '数据结构',
        coreContent: [
          '列表(List)创建与操作',
          '元组(Tuple)特点',
          '字典(Dict)使用',
          '集合(Set)操作'
        ],
        practiceTask: '实现一个学生成绩管理小程序',
        codeExample: `# 学生成绩管理系统
students = ["张三", "李四", "王五"]
scores = [95, 88, 92]

# 创建字典存储成绩
grade_dict = {
    "张三": 95,
    "李四": 88,
    "王五": 92
}

# 添加新学生
grade_dict["赵六"] = 90

# 计算平均分
average = sum(grade_dict.values()) / len(grade_dict)
print(f"平均分: {average:.2f}")

# 找出最高分学生
top_student = max(grade_dict, key=grade_dict.get)
print(f"最高分学生: {top_student}")`
      },
      {
        day: 4,
        week: 1,
        title: '流程控制',
        coreContent: [
          'if条件判断',
          'for循环',
          'while循环',
          'break与continue'
        ],
        practiceTask: '编写九九乘法表和猜数字游戏',
        codeExample: `# 九九乘法表
for i in range(1, 10):
    row = []
    for j in range(1, i + 1):
        row.append(f"{j}x{i}={i*j}")
    print(" | ".join(row))

# 猜数字游戏
import random
target = random.randint(1, 100)
attempts = 0

while True:
    guess = int(input("请猜一个1-100的数字: "))
    attempts += 1
    if guess == target:
        print(f"恭喜你！猜对了！共用了{attempts}次")
        break
    elif guess < target:
        print("太小了，再试试")
    else:
        print("太大了，再试试")`
      },
      {
        day: 5,
        week: 1,
        title: '函数基础',
        coreContent: [
          '函数定义与调用',
          '参数传递方式',
          '返回值处理',
          '变量作用域'
        ],
        practiceTask: '封装5个常用计算函数',
        codeExample: `# 常用函数封装
def calculate_mean(numbers):
    """计算平均值"""
    return sum(numbers) / len(numbers)

def calculate_variance(numbers):
    """计算方差"""
    mean = calculate_mean(numbers)
    return sum((x - mean) ** 2 for x in numbers) / len(numbers)

def calculate_std(numbers):
    """计算标准差"""
    return calculate_variance(numbers) ** 0.5

def normalize(data):
    """数据归一化"""
    min_val, max_val = min(data), max(data)
    return [(x - min_val) / (max_val - min_val) for x in data]

def calculate_correlation(x, y):
    """计算相关系数"""
    n = len(x)
    mean_x, mean_y = calculate_mean(x), calculate_mean(y)
    numerator = sum((x[i] - mean_x) * (y[i] - mean_y) for i in range(n))
    denominator = (n * calculate_std(x) * calculate_std(y))
    return numerator / denominator

# 测试
data = [10, 20, 30, 40, 50]
print(f"平均值: {calculate_mean(data):.2f}")
print(f"标准差: {calculate_std(data):.2f}")`
      },
      {
        day: 6,
        week: 1,
        title: '模块与包',
        coreContent: [
          'import导入方式',
          '常用内置模块(os, sys, random)',
          '第三方包安装',
          '自定义模块创建'
        ],
        practiceTask: '编写文件批量重命名脚本',
        codeExample: `# 文件批量重命名脚本
import os
import random
from datetime import datetime

def batch_rename_files(directory, prefix="file"):
    """批量重命名目录下的文件"""
    if not os.path.exists(directory):
        print(f"目录不存在: {directory}")
        return
    
    files = os.listdir(directory)
    renamed_count = 0
    
    for i, filename in enumerate(sorted(files), 1):
        old_path = os.path.join(directory, filename)
        if os.path.isfile(old_path):
            ext = os.path.splitext(filename)[1]
            new_name = f"{prefix}_{i:03d}{ext}"
            new_path = os.path.join(directory, new_name)
            os.rename(old_path, new_path)
            renamed_count += 1
            print(f"{filename} -> {new_name}")
    
    return renamed_count

def generate_random_data(count=10, min_val=0, max_val=100):
    """生成随机数据"""
    return [random.randint(min_val, max_val) for _ in range(count)]

# 使用示例
data = generate_random_data(20)
print(f"生成了 {len(data)} 个随机数据")
print(f"数据: {data}")`
      },
      {
        day: 7,
        week: 1,
        title: '周末复习',
        coreContent: [
          '综合练习回顾',
          '函数与循环结合',
          '数据分析小程序开发'
        ],
        practiceTask: '完成一个成绩分析程序',
        checkpoints: [
          '能独立编写Python程序',
          '掌握基本数据结构和控制流',
          '会使用函数封装代码'
        ],
        codeExample: `# 周末综合练习：学生成绩分析系统

# 学生数据
students = [
    {"姓名": "张三", "数学": 85, "语文": 92, "英语": 88},
    {"姓名": "李四", "数学": 78, "语文": 85, "英语": 90},
    {"姓名": "王五", "数学": 92, "语文": 88, "英语": 95},
    {"姓名": "赵六", "数学": 70, "语文": 75, "英语": 72},
    {"姓名": "钱七", "数学": 88, "语文": 90, "英语": 86}
]

# 计算平均分的函数
def calculate_average(score_dict):
    subjects = ["数学", "语文", "英语"]
    total = sum(score_dict[s] for s in subjects)
    return round(total / len(subjects), 2)

# 找最高分科目
def find_best_subject(score_dict):
    subjects = ["数学", "语文", "英语"]
    scores = [(s, score_dict[s]) for s in subjects]
    return max(scores, key=lambda x: x[1])

# 成绩等级
def get_grade(average):
    if average >= 90: return "A"
    elif average >= 80: return "B"
    elif average >= 70: return "C"
    else: return "D"

# 统计分析
print("=" * 50)
print("学生成绩分析报告")
print("=" * 50)

# 计算每个学生的平均分和等级
results = []
for student in students:
    avg = calculate_average(student)
    best_subj, best_score = find_best_subject(student)
    grade = get_grade(avg)
    results.append({
        "姓名": student["姓名"],
        "平均分": avg,
        "最高科目": best_subj,
        "最高分": best_score,
        "等级": grade
    })

# 打印结果
print('姓名      平均分    最高科目    最高分    等级')
print("-" * 50)
for r in results:
    name = r["姓名"]
    avg = r["平均分"]
    subj = r["最高科目"]
    score = r["最高分"]
    grade = r["等级"]
    print(f'{name:<8} {avg:>8.2f} {subj:<8} {score:>6} {grade:>6}')

# 班级统计
all_avgs = [r["平均分"] for r in results]
class_avg = sum(all_avgs) / len(all_avgs)
highest_avg = max(results, key=lambda x: x["平均分"])
lowest_avg = min(results, key=lambda x: x["平均分"])

print("班级统计:")
print(f"班级平均分: {class_avg:.2f}")
print(f"最高分学生: {highest_avg['姓名']} ({highest_avg['平均分']:.2f}分)")
print(f"最低分学生: {lowest_avg['姓名']} ({lowest_avg['平均分']:.2f}分)")`
      }
    ]
  },
  {
    week: 2,
    title: '数据处理基础',
    description: '掌握NumPy和Pandas进行高效数据处理',
    days: [
      {
        day: 8,
        week: 2,
        title: 'NumPy基础',
        coreContent: [
          'NumPy数组创建',
          '数组索引与切片',
          '数组形状操作',
          '统计量计算'
        ],
        practiceTask: '生成随机数据矩阵并计算统计量',
        codeExample: `import numpy as np

# 创建数组
arr = np.array([1, 2, 3, 4, 5])
arr_2d = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

# 生成随机数据矩阵
data_matrix = np.random.randn(100, 5)
print(f"矩阵形状: {data_matrix.shape}")
print(f"矩阵统计:")
print(f"  均值: {data_matrix.mean(axis=0)}")
print(f"  标准差: {data_matrix.std(axis=0)}")
print(f"  最大值: {data_matrix.max(axis=0)}")
print(f"  最小值: {data_matrix.min(axis=0)}")

# 数组索引切片
print(f"前10行: {data_matrix[:10, 0]}")`
      },
      {
        day: 9,
        week: 2,
        title: 'NumPy进阶',
        coreContent: [
          '广播机制原理',
          '向量化运算',
          '数学函数应用',
          '矩阵运算'
        ],
        practiceTask: '实现矩阵运算（加减乘除转置）',
        codeExample: `import numpy as np

# 矩阵基本运算
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

print("矩阵加法:")
print(A + B)

print("矩阵乘法 (元素级):")
print(A * B)

print("矩阵乘法 (矩阵乘法):")
print(A @ B)

print("矩阵转置:")
print(A.T)

# 广播机制
arr = np.array([1, 2, 3])
print("广播加法 (arr + 10):")
print(arr + 10)

# 数学函数
data = np.array([1, 4, 9, 16])
print("平方根:")
print(np.sqrt(data))
print("对数:")
print(np.log(data + 1))`
      },
      {
        day: 10,
        week: 2,
        title: 'Pandas入门',
        coreContent: [
          'Series创建与操作',
          'DataFrame创建',
          '读取CSV/Excel文件',
          '数据查看方法'
        ],
        practiceTask: '导入一份真实科研数据集',
        codeExample: `import pandas as pd
import numpy as np

# 创建DataFrame
df = pd.DataFrame({
    '姓名': ['张三', '李四', '王五', '赵六'],
    '年龄': [25, 30, 28, 35],
    '身高': [170, 165, 175, 168],
    '体重': [65, 55, 70, 60]
})

print("DataFrame基本信息:")
print(df.info())
print("前几行数据:")
print(df.head())
print("统计描述:")
print(df.describe())

# 添加计算列
df['BMI'] = df['体重'] / (df['身高'] / 100) ** 2
print("带BMI的数据:")
print(df)`
      },
      {
        day: 11,
        week: 2,
        title: '数据筛选',
        coreContent: [
          '条件筛选方法',
          'loc与iloc使用',
          '布尔索引',
          '多条件筛选'
        ],
        practiceTask: '筛选符合条件的数据子集',
        codeExample: `import pandas as pd
import numpy as np

# 创建示例数据
df = pd.DataFrame({
    '产品': ['A', 'B', 'C', 'D', 'E', 'F'],
    '类别': ['电子', '服装', '电子', '食品', '服装', '电子'],
    '销量': [120, 85, 200, 150, 90, 180],
    '评分': [4.5, 4.2, 4.8, 4.0, 3.9, 4.6]
})

print("原始数据:")
print(df)

print("筛选销量>100的产品:")
high_sales = df[df['销量'] > 100]
print(high_sales)

print("多条件筛选 (销量>100 且 评分>4):")
filtered = df[(df['销量'] > 100) & (df['评分'] > 4)]
print(filtered)

print("使用loc筛选特定列:")
print(df.loc[df['类别'] == '电子', ['产品', '销量']])

print("使用iloc按位置筛选:")
print(df.iloc[0:3, 1:3])`
      },
      {
        day: 12,
        week: 2,
        title: '数据清洗',
        coreContent: [
          '缺失值处理',
          '重复值删除',
          '数据类型转换',
          '异常值检测'
        ],
        practiceTask: '清洗一份有缺失值的科研数据',
        codeExample: `import pandas as pd
import numpy as np

# 创建带缺失值的数据
data = {
    '日期': ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05'],
    '温度': [25.5, None, 26.2, 27.1, None],
    '湿度': [65, 68, 70, None, 72],
    'PM2.5': [45, 52, 48, 55, 50]
}
df = pd.DataFrame(data)

print("原始数据(含缺失值):")
print(df)
print(f"缺失值统计:\n{df.isnull().sum()}")

# 填充缺失值
df['温度'].fillna(df['温度'].mean(), inplace=True)
df['湿度'].fillna(method='ffill', inplace=True)
print("填充后数据:")
print(df)

# 删除重复行
df_cleaned = df.drop_duplicates()
print(f"去重后行数: {len(df_cleaned)}")

# 数据类型转换
df['温度'] = df['温度'].astype(int)
print("数据类型转换后:")
print(df.dtypes)`
      },
      {
        day: 13,
        week: 2,
        title: '数据整合',
        coreContent: [
          'merge合并操作',
          'concat拼接',
          'groupby分组聚合',
          '多表关联分析'
        ],
        practiceTask: '完成多表关联分析',
        codeExample: `import pandas as pd

# 创建销售数据
sales = pd.DataFrame({
    '产品ID': [1, 2, 3, 4],
    '产品名': ['A', 'B', 'C', 'D'],
    '单价': [10, 20, 15, 25]
})

orders = pd.DataFrame({
    '订单ID': [1, 2, 3, 4, 5],
    '产品ID': [1, 2, 1, 3, 1],
    '数量': [10, 5, 8, 3, 12]
})

print("产品表:")
print(sales)
print("订单表:")
print(orders)

# 合并数据
merged = orders.merge(sales, on='产品ID')
merged['总价'] = merged['数量'] * merged['单价']
print("合并后的订单详情:")
print(merged)

# 分组聚合
grouped = merged.groupby('产品名').agg({
    '数量': 'sum',
    '总价': 'sum'
}).reset_index()
print("按产品分组统计:")
print(grouped)

# Concat拼接
df1 = pd.DataFrame({'A': [1, 2], 'B': [3, 4]})
df2 = pd.DataFrame({'A': [5, 6], 'B': [7, 8]})
combined = pd.concat([df1, df2], ignore_index=True)
print("拼接后的数据:")
print(combined)`
      },
      {
        day: 14,
        week: 2,
        title: '周末实战',
        coreContent: [
          '完整数据清洗流程',
          '实战项目练习'
        ],
        practiceTask: '处理一份真实科研问卷数据',
        checkpoints: [
          '能熟练使用NumPy进行数值计算',
          '能用Pandas处理CSV/Excel数据',
          '会进行数据清洗和筛选'
        ],
        codeExample: `# 周末实战：科研问卷数据处理

import pandas as pd
import numpy as np

# 模拟科研问卷数据
data = {
    'ID': range(1, 21),
    '年龄': [25, 30, np.nan, 28, 35, 27, 32, 29, 31, 26,
             33, 28, 30, 27, 29, 25, 31, 28, 30, 32],
    '满意度': [4, 5, 3, np.nan, 5, 4, 5, 3, 4, 5,
               4, 5, 3, 4, 5, 4, np.nan, 5, 4, 5],
    '推荐意愿': [8, 9, 7, 6, 10, 8, 9, 7, 8, 9,
                8, 9, 7, 8, 9, 7, 8, 9, 8, 10],
    '性别': ['M', 'F', 'M', 'F', 'M', 'M', 'F', 'F', 'M', 'F',
             'M', 'F', 'M', 'F', 'M', 'F', 'M', 'F', 'M', 'F'],
    '地区': ['北京', '上海', '广州', '深圳', '北京', '上海',
             '广州', '深圳', '北京', '上海', '广州', '深圳',
             '北京', '上海', '广州', '深圳', '北京', '上海', '广州', '深圳']
}
df = pd.DataFrame(data)

print("=" * 50)
print("科研问卷数据清洗与分析")
print("=" * 50)

print("原始数据形状: {0}".format(df.shape))
print("缺失值统计:")
print(df.isnull().sum())

# 填充缺失值
df['年龄'].fillna(df['年龄'].median(), inplace=True)
df['满意度'].fillna(df['满意度'].mode()[0], inplace=True)

print("清洗后缺失值:")
print(df.isnull().sum())

# 基本统计
print("【描述性统计】")
print(df.describe())

# 分组分析
print("【按地区分组统计】")
region_stats = df.groupby('地区').agg({
    '满意度': 'mean',
    '推荐意愿': 'mean',
    '年龄': 'mean'
}).round(2)
print(region_stats)

# 性别差异分析
print("【性别差异分析】")
gender_stats = df.groupby('性别').agg({
    '满意度': 'mean',
    '推荐意愿': 'mean'
}).round(2)
print(gender_stats)

# 相关性分析
print("【相关性分析】")
numeric_cols = ['年龄', '满意度', '推荐意愿']
corr_matrix = df[numeric_cols].corr()
print(corr_matrix.round(3))

# 数据筛选
print("【高满意度用户】")
score_col = '满意度'
high_satisfaction = df[df[score_col] >= 4.5]
n_high = len(high_satisfaction)
n_total = len(df)
print("高满意度用户数: " + str(n_high) + " / " + str(n_total))`
      }
    ]
  },
  {
    week: 3,
    title: '统计与可视化',
    description: '掌握Matplotlib、Seaborn可视化，以及统计检验方法',
    days: [
      {
        day: 15,
        week: 3,
        title: 'Matplotlib基础',
        coreContent: [
          '折线图绘制',
          '柱状图绘制',
          '散点图绘制',
          '直方图绘制'
        ],
        practiceTask: '绘制科研数据可视化图表',
        codeExample: `import matplotlib.pyplot as plt
import numpy as np

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei', 'DejaVu Sans']
plt.rcParams['axes.unicode_minus'] = False

# 准备数据
months = ['1月', '2月', '3月', '4月', '5月', '6月']
sales = [120, 150, 180, 160, 200, 220]
profit = [30, 40, 50, 45, 60, 70]

# 创建画布
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# 折线图
axes[0, 0].plot(months, sales, marker='o', linewidth=2)
axes[0, 0].set_title('月度销售额趋势')
axes[0, 0].set_xlabel('月份')
axes[0, 0].set_ylabel('销售额(万)')
axes[0, 0].grid(True)

# 柱状图
axes[0, 1].bar(months, profit, color='skyblue')
axes[0, 1].set_title('月度利润')
axes[0, 1].set_xlabel('月份')
axes[0, 1].set_ylabel('利润(万)')

# 散点图
np.random.seed(42)
x = np.random.randn(100)
y = x + np.random.randn(100) * 0.5
axes[1, 0].scatter(x, y, alpha=0.6, c='coral')
axes[1, 0].set_title('相关性散点图')
axes[1, 0].set_xlabel('变量X')
axes[1, 0].set_ylabel('变量Y')

# 直方图
data = np.random.randn(1000)
axes[1, 1].hist(data, bins=30, color='green', alpha=0.7)
axes[1, 1].set_title('数据分布直方图')
axes[1, 1].set_xlabel('数值')
axes[1, 1].set_ylabel('频数')

plt.tight_layout()
plt.show()
print("图表生成成功!")`
      },
      {
        day: 16,
        week: 3,
        title: 'Matplotlib进阶',
        coreContent: [
          '子图布局设置',
          '图例与标注',
          '样式定制',
          '多面板图表制作'
        ],
        practiceTask: '制作论文级别的多面板图表',
        codeExample: `import matplotlib.pyplot as plt
import numpy as np

plt.style.use('seaborn-v0_8-whitegrid')
fig = plt.figure(figsize=(14, 8))

# 主图
ax_main = plt.subplot2grid((3, 3), (0, 0), colspan=2, rowspan=2)
x = np.linspace(0, 10, 100)
y1 = np.sin(x)
y2 = np.cos(x)

ax_main.plot(x, y1, 'b-', linewidth=2, label='sin(x)')
ax_main.plot(x, y2, 'r--', linewidth=2, label='cos(x)')
ax_main.fill_between(x, y1, alpha=0.3)
ax_main.set_xlabel('X轴', fontsize=12)
ax_main.set_ylabel('Y轴', fontsize=12)
ax_main.set_title('三角函数图', fontsize=14, fontweight='bold')
ax_main.legend(loc='upper right', fontsize=10)
ax_main.annotate('峰值', xy=(np.pi/2, 1), xytext=(np.pi/2+1, 0.8),
                arrowprops=dict(arrowstyle='->', color='blue'))

# 右上子图
ax_right = plt.subplot2grid((3, 3), (0, 2))
ax_right.bar(['A', 'B', 'C', 'D'], [3, 7, 5, 9], color=['#3498db', '#e74c3c', '#2ecc71', '#f39c12'])
ax_right.set_title('分类统计')

# 右中子图
ax_mid = plt.subplot2grid((3, 3), (1, 2))
sizes = [30, 25, 25, 20]
labels = ['北京', '上海', '广州', '深圳']
colors = ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99']
ax_mid.pie(sizes, labels=labels, colors=colors, autopct='%1.1f%%', startangle=90)
ax_mid.set_title('城市分布')

# 底部子图
ax_bottom = plt.subplot2grid((3, 3), (2, 0), colspan=3)
categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
values1 = [12, 15, 14, 16, 18, 20, 14]
values2 = [10, 12, 11, 13, 15, 17, 12]
x_pos = np.arange(len(categories))
width = 0.35
ax_bottom.bar(x_pos - width/2, values1, width, label='2023', color='#3498db')
ax_bottom.bar(x_pos + width/2, values2, width, label='2024', color='#e74c3c')
ax_bottom.set_xlabel('星期')
ax_bottom.set_ylabel('数量')
ax_bottom.set_title('周数据对比')
ax_bottom.set_xticks(x_pos)
ax_bottom.set_xticklabels(categories)
ax_bottom.legend()

plt.tight_layout()
plt.show()
print("高级图表生成成功!")`
      },
      {
        day: 17,
        week: 3,
        title: 'Seaborn可视化',
        coreContent: [
          '热力图绘制',
          '箱线图与小提琴图',
          '分布图绘制',
          '统计图表组合'
        ],
        practiceTask: '绘制统计图表',
        codeExample: `import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

plt.style.use('seaborn-v0_8-whitegrid')
fig, axes = plt.subplots(2, 2, figsize=(14, 12))

# 示例数据
np.random.seed(42)
tips = pd.DataFrame({
    'day': np.random.choice(['Thu', 'Fri', 'Sat', 'Sun'], 200),
    'total_bill': np.random.uniform(10, 60, 200),
    'tip': np.random.uniform(2, 12, 200),
    'smoker': np.random.choice(['Yes', 'No'], 200),
    'sex': np.random.choice(['Male', 'Female'], 200)
})

# 箱线图
sns.boxplot(x='day', y='total_bill', data=tips, ax=axes[0, 0], palette='Set2')
axes[0, 0].set_title('每日消费箱线图')

# 小提琴图
sns.violinplot(x='day', y='tip', data=tips, ax=axes[0, 1], palette='muted')
axes[0, 1].set_title('小费分布小提琴图')

# 热力图
corr = tips[['total_bill', 'tip']].corr()
sns.heatmap(corr, annot=True, cmap='RdYlBu_r', center=0, ax=axes[1, 0],
            fmt='.2f', square=True, linewidths=1)
axes[1, 0].set_title('相关性热力图')

# 分布图
sns.histplot(data=tips, x='total_bill', kde=True, ax=axes[1, 1], 
             color='purple', alpha=0.6)
axes[1, 1].set_title('消费金额分布')

plt.tight_layout()
plt.show()
print("Seaborn统计图表生成成功!")`
      },
      {
        day: 18,
        week: 3,
        title: '描述性统计',
        coreContent: [
          '均值、中位数、众数',
          '标准差与方差',
          '偏度和峰度',
          '相关系数计算'
        ],
        practiceTask: '计算科研数据统计指标',
        codeExample: `import pandas as pd
import numpy as np
from scipy import stats

# 示例科研数据
data = {
    'subject': range(1, 21),
    'score': [85, 90, 78, 92, 88, 76, 95, 82, 89, 91,
              77, 84, 88, 93, 79, 86, 90, 83, 87, 94],
    'time': [120, 135, 110, 145, 130, 105, 150, 125, 140, 138,
             108, 128, 132, 148, 112, 126, 142, 124, 134, 152]
}
df = pd.DataFrame(data)

print("=" * 50)
print("描述性统计分析报告")
print("=" * 50)

# 集中趋势
print("【集中趋势】")
score_mean = df['score'].mean()
score_median = df['score'].median()
score_mode = df['score'].mode().values[0]
print(f"均值 (Mean): {score_mean:.2f}")
print(f"中位数 (Median): {score_median:.2f}")
print(f"众数 (Mode): {score_mode:.0f}")

# 离散程度
print("【离散程度】")
score_std = df['score'].std()
score_var = df['score'].var()
score_range = df['score'].max() - df['score'].min()
score_iqr = df['score'].quantile(0.75) - df['score'].quantile(0.25)
print(f"标准差 (Std): {score_std:.2f}")
print(f"方差 (Var): {score_var:.2f}")
print(f"极差 (Range): {score_range:.0f}")
print(f"四分位距 (IQR): {score_iqr:.2f}")

# 分布形态
print("【分布形态】")
skewness = stats.skew(df['score'])
kurtosis = stats.kurtosis(df['score'])
print(f"偏度 (Skewness): {skewness:.3f}")
print(f"峰度 (Kurtosis): {kurtosis:.3f}")

# 相关性
print("【相关性分析】")
correlation = df['score'].corr(df['time'])
print(f"分数与时间的相关系数: {correlation:.3f}")

# 完整统计报告
print("【完整统计描述】")
score_time_desc = df[['score', 'time']].describe()
print(score_time_desc)

# 可视化数据分布
print("【数据分布信息】")
print(f"分数范围: {df['score'].min()} - {df['score'].max()}")
print(f"时间范围: {df['time'].min()} - {df['time'].max()}")`
      },
      {
        day: 19,
        week: 3,
        title: 'SciPy统计检验',
        coreContent: [
          't检验（单样本、配对、独立）',
          '卡方检验',
          '方差分析(ANOVA)',
          '假设检验结果解读'
        ],
        practiceTask: '完成一组假设检验分析',
        codeExample: `import numpy as np
from scipy import stats
import pandas as pd

np.random.seed(42)

# 生成示例数据
group_a = np.random.normal(75, 10, 30)  # 对照组
group_b = np.random.normal(82, 10, 30)  # 实验组

print("=" * 50)
print("统计假设检验分析报告")
print("=" * 50)

# 单样本t检验
print("【单样本t检验】")
print(f"检验: 组A均值是否等于80")
t_stat, p_value = stats.ttest_1samp(group_a, 80)
print(f"t统计量: {t_stat:.4f}")
print(f"p值: {p_value:.4f}")
print(f"结论: {'拒绝原假设' if p_value < 0.05 else '不能拒绝原假设'}")

# 独立样本t检验
print("【独立样本t检验】")
print(f"检验: 组A与组B均值是否有显著差异")
t_stat2, p_value2 = stats.ttest_ind(group_a, group_b)
print(f"t统计量: {t_stat2:.4f}")
print(f"p值: {p_value2:.4f}")
print(f"结论: 两组{'存在' if p_value2 < 0.05 else '不存在'}显著差异")

# 配对样本t检验
print("【配对样本t检验】")
before = np.array([75, 80, 82, 78, 85, 79, 83, 81, 77, 84])
after = np.array([78, 85, 86, 82, 88, 83, 87, 85, 80, 88])
t_stat3, p_value3 = stats.ttest_rel(before, after)
print(f"t统计量: {t_stat3:.4f}")
print(f"p值: {p_value3:.4f}")
print(f"结论: 干预前后{'存在' if p_value3 < 0.05 else '不存在'}显著差异")

# ANOVA
print("【单因素方差分析(ANOVA)】")
group_c = np.random.normal(79, 10, 30)
f_stat, p_value_anova = stats.f_oneway(group_a, group_b, group_c)
print(f"F统计量: {f_stat:.4f}")
print(f"p值: {p_value_anova:.4f}")
print(f"结论: 三组{'存在' if p_value_anova < 0.05 else '不存在'}显著差异")`
      },
      {
        day: 20,
        week: 3,
        title: '回归分析',
        coreContent: [
          '线性回归原理',
          '多元线性回归',
          '逻辑回归应用',
          '结果解读与可视化'
        ],
        practiceTask: '建立预测模型',
        codeExample: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_squared_error

np.random.seed(42)

# 生成线性关系数据
X = 2 * np.random.rand(100, 1)
y = 4 + 3 * X + np.random.randn(100, 1)

# 训练线性回归模型
model = LinearRegression()
model.fit(X, y)
y_pred = model.predict(X)

print("=" * 50)
print("线性回归分析报告")
print("=" * 50)
print(f"截距 (Intercept): {model.intercept_[0]:.4f}")
print(f"斜率 (Coefficient): {model.coef_[0][0]:.4f}")
print(f"回归方程: y = {model.intercept_[0]:.2f} + {model.coef_[0][0]:.2f}x")

# 模型评估
r2 = r2_score(y, y_pred)
rmse = np.sqrt(mean_squared_error(y, y_pred))
print(f"模型评估指标:")
print(f"R² 决定系数: {r2:.4f}")
print(f"RMSE 均方根误差: {rmse:.4f}")

# 可视化
plt.figure(figsize=(10, 6))
plt.scatter(X, y, alpha=0.5, label='实际数据')
plt.plot(X, y_pred, 'r-', linewidth=2, label=f'回归线 (y = {model.coef_[0][0]:.2f}x + {model.intercept_[0]:.2f})')
plt.xlabel('X')
plt.ylabel('y')
plt.title('线性回归拟合')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
print("回归图已生成!")`
      },
      {
        day: 21,
        week: 3,
        title: '周末实战',
        coreContent: [
          '完整统计分析流程',
          '数据分析报告生成'
        ],
        practiceTask: '分析实验数据并生成报告',
        checkpoints: [
          '能绘制论文级别的统计图表',
          '会进行常用统计检验',
          '能进行简单回归分析'
        ],
        codeExample: `# 周末实战：实验数据统计分析

import numpy as np
import pandas as pd
from scipy import stats

print("=" * 60)
print("实验数据分析报告")
print("=" * 60)

# 实验数据：对照组 vs 实验组
np.random.seed(42)
control_group = np.array([72, 75, 78, 74, 80, 76, 73, 79, 77, 75,
                          74, 78, 76, 72, 79, 73, 77, 75, 78, 74])
experimental_group = np.array([85, 88, 82, 90, 86, 89, 83, 87, 91, 84,
                               88, 85, 87, 86, 89, 84, 88, 90, 86, 85])

# 基本统计
print("【1. 基本统计描述】")
print(f"对照组:   均值={control_group.mean():.2f}, 标准差={control_group.std():.2f}")
print(f"实验组:   均值={experimental_group.mean():.2f}, 标准差={experimental_group.std():.2f}")
print(f"均值差异: {experimental_group.mean() - control_group.mean():.2f}")

# 独立样本t检验
print("【2. 独立样本t检验】")
t_stat, p_value = stats.ttest_ind(control_group, experimental_group)
print(f"t统计量: {t_stat:.4f}")
print(f"p值: {p_value:.6f}")
print(f"结论: {'两组存在显著差异' if p_value < 0.05 else '两组无显著差异'} (α=0.05)")

# 效应量 (Cohen's d)
pooled_std = np.sqrt(((len(control_group)-1)*control_group.std()**2 + 
                       (len(experimental_group)-1)*experimental_group.std()**2) / 
                      (len(control_group) + len(experimental_group) - 2))
cohens_d = (experimental_group.mean() - control_group.mean()) / pooled_std
print(f"效应量 (Cohen's d): {cohens_d:.4f}")

# 效应量解释
if abs(cohens_d) < 0.2:
    effect_size = "微小"
elif abs(cohens_d) < 0.5:
    effect_size = "小"
elif abs(cohens_d) < 0.8:
    effect_size = "中等"
else:
    effect_size = "大"
print(f"效应量解释: {effect_size}效应")

# 95%置信区间
print("【3. 95%置信区间】")
def ci_95(data):
    se = stats.sem(data)
    mean = np.mean(data)
    ci = stats.t.interval(0.95, len(data)-1, loc=mean, scale=se)
    return ci

print(f"对照组:   {ci_95(control_group)[0]:.2f} ~ {ci_95(control_group)[1]:.2f}")
print(f"实验组:   {ci_95(experimental_group)[0]:.2f} ~ {ci_95(experimental_group)[1]:.2f}")

# 线性回归分析
print("【4. 线性回归分析】")
# 模拟时间-效果数据
time_points = np.array([0, 2, 4, 6, 8, 10])
effects = np.array([10, 25, 38, 52, 63, 78])
slope, intercept, r_value, p_value, std_err = stats.linregress(time_points, effects)
print(f"回归方程: 效果 = {intercept:.2f} + {slope:.2f} × 时间")
print(f"R² = {r_value**2:.4f}")
print(f"斜率显著性: p = {p_value:.6f}")`
      }
    ]
  },
  {
    week: 4,
    title: '科研实战',
    description: '完成科研数据分析全流程，包括机器学习入门和论文图表制作',
    days: [
      {
        day: 22,
        week: 4,
        title: '机器学习入门',
        coreContent: [
          'scikit-learn基础',
          '训练测试集划分',
          'KNN分类算法',
          '模型训练流程'
        ],
        practiceTask: '构建第一个分类模型',
        codeExample: `import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.datasets import make_classification
from sklearn.metrics import accuracy_score, classification_report

# 生成示例分类数据
X, y = make_classification(
    n_samples=200, n_features=2, n_informative=2,
    n_redundant=0, n_classes=2, random_state=42
)

# 划分训练集和测试集
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

print("数据集划分:")
print(f"训练集大小: {len(X_train)}")
print(f"测试集大小: {len(X_test)}")

# 训练KNN模型
knn = KNeighborsClassifier(n_neighbors=5)
knn.fit(X_train, y_train)

# 预测
y_pred = knn.predict(X_test)

# 评估
accuracy = accuracy_score(y_test, y_pred)
print(f"模型准确率: {accuracy:.2%}")

print("分类报告:")
print(classification_report(y_test, y_pred, target_names=['类别0', '类别1']))`
      },
      {
        day: 23,
        week: 4,
        title: '模型评估',
        coreContent: [
          '准确率、召回率、F1分数',
          '混淆矩阵',
          'ROC曲线与AUC',
          '交叉验证'
        ],
        practiceTask: '评估模型性能',
        codeExample: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import cross_val_score
from sklearn.metrics import (accuracy_score, precision_score, recall_score,
                             f1_score, confusion_matrix, roc_curve, auc)
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import make_classification

# 生成数据
X, y = make_classification(n_samples=500, n_features=20, random_state=42)

# 训练模型
model = LogisticRegression(max_iter=1000, random_state=42)
model.fit(X, y)
y_pred = model.predict(X)
y_prob = model.predict_proba(X)[:, 1]

print("=" * 50)
print("模型评估报告")
print("=" * 50)

print("【基本评估指标】")
print(f"准确率 (Accuracy): {accuracy_score(y, y_pred):.4f}")
print(f"精确率 (Precision): {precision_score(y, y_pred):.4f}")
print(f"召回率 (Recall): {recall_score(y, y_pred):.4f}")
print(f"F1分数: {f1_score(y, y_pred):.4f}")

print("【混淆矩阵】")
cm = confusion_matrix(y, y_pred)
print(cm)

print("【交叉验证】")
cv_scores = cross_val_score(model, X, y, cv=5)
print(f"交叉验证得分: {cv_scores}")
print(f"平均得分: {cv_scores.mean():.4f} (+/- {cv_scores.std()*2:.4f})")

print("【ROC-AUC】")
fpr, tpr, _ = roc_curve(y, y_prob)
roc_auc = auc(fpr, tpr)
print(f"AUC值: {roc_auc:.4f}")`
      },
      {
        day: 24,
        week: 4,
        title: '特征工程',
        coreContent: [
          '特征选择方法',
          '特征缩放（标准化/归一化）',
          '编码转换',
          '降维技术PCA'
        ],
        practiceTask: '处理科研数据特征',
        codeExample: `import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler, MinMaxScaler, LabelEncoder
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.decomposition import PCA

# 创建示例数据
df = pd.DataFrame({
    '数值特征1': np.random.randn(100),
    '数值特征2': np.random.randn(100),
    '类别特征': np.random.choice(['A', 'B', 'C'], 100),
    '目标': np.random.choice([0, 1], 100)
})

print("原始数据:")
print(df.head())

# 数值特征缩放
print("【特征缩放】")
scaler = StandardScaler()
df_scaled = df.copy()
df_scaled[['数值特征1', '数值特征2']] = scaler.fit_transform(
    df[['数值特征1', '数值特征2']]
)
print("标准化后:")
print(df_scaled[['数值特征1', '数值特征2']].describe().round(3))

# 类别编码
print("【类别编码】")
le = LabelEncoder()
df['类别编码'] = le.fit_transform(df['类别特征'])
print("编码映射:", dict(zip(le.classes_, range(len(le.classes_)))))

# 特征选择
print("【特征选择】")
X = df[['数值特征1', '数值特征2', '类别编码']]
y = df['目标']
selector = SelectKBest(f_classif, k=2)
X_selected = selector.fit_transform(X, y)
print(f"选中的特征索引: {selector.get_support(indices=True)}")
print(f"特征得分: {selector.scores_}")

# PCA降维
print("【PCA降维】")
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X)
print(f"解释方差比: {pca.explained_variance_ratio_}")
print(f"累计解释方差: {sum(pca.explained_variance_ratio_):.4f}")`
      },
      {
        day: 25,
        week: 4,
        title: '文献数据挖掘',
        coreContent: [
          '文本处理基础',
          '正则表达式应用',
          '数据提取与清洗',
          '简单爬虫入门'
        ],
        practiceTask: '提取文献信息',
        codeExample: `import re
import pandas as pd

# 示例文献数据
text = """
参考文献:
[1] Smith, J. et al. (2023) "Machine Learning in Healthcare", Nature, 45(2), pp.123-145.
[2] Wang, L. & Chen, Y. (2022) "Deep Learning Applications", Science, 38(4), pp.234-256.
[3] Li, M. (2021) "Data Mining Methods", IEEE Transactions, 15(3), pp.89-102.
"""

print("=" * 50)
print("文献信息提取")
print("=" * 50)

# 提取作者
authors = re.findall(r'([A-Z][a-z]+),\\s*([A-Z]\\.)\\s*et al\\.|([A-Z][a-z]+),\\s*([A-Z])\\s*&\\s*([A-Z][a-z]+),\\s*([A-Z]\\.)|([A-Z][a-z]+),\\s*([A-Z]\\.)', text)
print("提取的作者信息:")
for match in re.finditer(r'([A-Z][a-z]+)', text):
    if match.group(1) not in ['Smith', 'Wang', 'Chen', 'Li']:
        print(f"  - {match.group(1)}")

# 提取年份
years = re.findall(r'\\((\\d{4})\\)', text)
print(f"发现的年份: {years}")

# 提取期刊
journals = re.findall(r'"([^"]+)"|(Nature|Science|IEEE)', text)
journals = [j[0] or j[1] for j in journals if any(j)]
print(f"发现的期刊: {journals}")

# 提取DOI
sample_doi = "10.1038/s41586-023-12345-6"
print(f"示例DOI: {sample_doi}")
print(f"DOI解析: {re.sub(r'(\\d{4})', r'\\1/', sample_doi).split('/')[0]}/{sample_doi.split('/')[1]}")

# 清理文本
dirty_text = "这是一些<em>需要清理</em>的HTML标签和   多个    空格。"
cleaned = re.sub(r'<[^>]+>', '', dirty_text)
cleaned = re.sub(r'\\s+', ' ', cleaned).strip()
print(f"清理前: {dirty_text}")
print(f"清理后: {cleaned}")`
      },
      {
        day: 26,
        week: 4,
        title: '论文图表规范',
        coreContent: [
          '图表分辨率要求',
          '配色方案选择',
          '标注规范',
          '图表美化技巧'
        ],
        practiceTask: '制作符合期刊要求的图表',
        codeExample: `import matplotlib.pyplot as plt
import numpy as np

# 设置论文级别图表参数
plt.rcParams.update({
    'font.size': 10,
    'axes.labelsize': 11,
    'axes.titlesize': 12,
    'legend.fontsize': 9,
    'figure.dpi': 300,  # 高分辨率
    'savefig.dpi': 300,
    'font.family': 'serif',
    'axes.spines.top': False,
    'axes.spines.right': False,
})

# 准备数据
x = np.linspace(0, 10, 100)
y1 = np.sin(x)
y2 = np.cos(x)

# 创建论文级别图表
fig, ax = plt.subplots(figsize=(7, 5))  # 单栏宽度
ax.plot(x, y1, 'b-', linewidth=1.5, label=r'$\\sin(x)$')
ax.plot(x, y2, 'r--', linewidth=1.5, label=r'$\\cos(x)$')

# 添加标签和标题
ax.set_xlabel('X axis (unit)', fontsize=11)
ax.set_ylabel('Y axis (value)', fontsize=11)
ax.set_title('Trigonometric Functions', fontsize=12, fontweight='bold')

# 添加图例
ax.legend(loc='upper right', frameon=True, fancybox=False, edgecolor='gray')

# 添加网格
ax.grid(True, linestyle='--', alpha=0.3)

# 保存为多种格式
fig.savefig('figure_300dpi.png', bbox_inches='tight', facecolor='white')
fig.savefig('figure_300dpi.pdf', bbox_inches='tight', facecolor='white')
print("论文级别图表已保存!")
print("建议格式: PDF (矢量图) 或 300+ DPI PNG")

# 显示基本信息
print(f"图表尺寸: {fig.get_size_inches()} inches")
print(f"分辨率: {fig.dpi} DPI")`
      },
      {
        day: 27,
        week: 4,
        title: '代码复现',
        coreContent: [
          '论文代码阅读',
          '关键方法提取',
          '代码实现与验证',
          '结果对比分析'
        ],
        practiceTask: '复现一篇论文的数据分析代码',
        checkpoints: [
          '能独立完成科研数据分析项目',
          '代码符合规范、可复现'
        ]
      },
      {
        day: 28,
        week: 4,
        title: '综合项目',
        coreContent: [
          '完整数据分析项目',
          '从数据到结论全流程'
        ],
        practiceTask: '完成完整科研数据分析项目',
        checkpoints: [
          '能撰写数据分析报告'
        ],
        codeExample: `# 综合项目：销售数据分析完整流程

import numpy as np
import pandas as pd

print("=" * 60)
print("销售数据分析完整项目报告")
print("=" * 60)

# 1. 数据生成
np.random.seed(42)
n = 200
data = {
    '日期': pd.date_range('2024-01-01', periods=n, freq='D'),
    '产品': np.random.choice(['产品A', '产品B', '产品C', '产品D'], n),
    '地区': np.random.choice(['华北', '华东', '华南', '西南'], n),
    '销售额': np.random.uniform(1000, 10000, n),
    '成本': np.random.uniform(500, 5000, n),
    '客户数': np.random.randint(10, 200, n)
}
df = pd.DataFrame(data)
df['利润'] = df['销售额'] - df['成本']
df['利润率'] = (df['利润'] / df['销售额'] * 100).round(2)

# 2. 数据概览
print("【一、数据概览】")
df_len = len(df)
min_date = df['日期'].min().date()
max_date = df['日期'].max().date()
print("数据量: " + str(df_len) + " 条记录")
print("时间范围: " + str(min_date) + " ~ " + str(max_date))
print("基本统计:")
print(df[['销售额', '成本', '利润']].describe().round(2))

# 3. 产品分析
print("【二、产品销售分析】")
product_stats = df.groupby('产品').agg({
    '销售额': 'sum',
    '利润': 'sum',
    '利润率': 'mean',
    '客户数': 'sum'
}).round(2)
product_stats = product_stats.sort_values('销售额', ascending=False)
print(product_stats)

# 找出最佳和最差产品
best_product = product_stats['销售额'].idxmax()
worst_product = product_stats['销售额'].idxmin()
best_sales = product_stats.loc[best_product, '销售额']
worst_sales = product_stats.loc[worst_product, '销售额']
print("最佳产品: " + best_product + " (销售额: " + str(int(best_sales)) + ")")
print("待改进产品: " + worst_product + " (销售额: " + str(int(worst_sales)) + ")")

# 4. 地区分析
print("【三、地区销售分析】")
region_stats = df.groupby('地区').agg({
    '销售额': 'sum',
    '利润': 'sum',
    '利润率': 'mean',
    '客户数': 'mean'
}).round(2)
region_stats = region_stats.sort_values('销售额', ascending=False)
print(region_stats)

# 5. 趋势分析
print("【四、月度趋势分析】")
df['月份'] = df['日期'].dt.to_period('M')
monthly = df.groupby('月份').agg({
    '销售额': 'sum',
    '利润': 'sum',
    '客户数': 'sum'
}).round(2)
print(monthly)

# 计算月环比增长率
monthly['销售额增长率'] = monthly['销售额'].pct_change() * 100
avg_growth = monthly['销售额增长率'].mean()
print("平均月增长率: " + str(round(avg_growth, 2)) + "%")

# 6. 结论与建议
print("【五、结论与建议】")
total_sales = df['销售额'].sum()
total_profit = df['利润'].sum()
avg_profit_rate = df['利润率'].mean()

print("1. 整体表现:")
print("   - 总销售额: " + "¥" + f"{total_sales:,.2f}")
print("   - 总利润: " + "¥" + f"{total_profit:,.2f}")
print("   - 平均利润率: " + str(round(avg_profit_rate, 2)) + "%")

top_product = product_stats.index[0]
top_region = region_stats.index[0]
print("2. 关键发现:")
print("   - 最畅销产品: " + top_product)
print("   - 销售最佳地区: " + top_region)

print("3. 优化建议:")
print(f"   - 重点推广{top_product}产品")
print(f"   - 加强{top_region}地区市场投入")
print(f"   - 关注利润率提升空间")`
      }
    ]
  },
  {
    week: 5,
    title: '总结提升',
    description: '代码优化与发表准备',
    days: [
      {
        day: 29,
        week: 5,
        title: '代码优化',
        coreContent: [
          '代码规范与注释技巧',
          '性能优化方法',
          '代码重构实践'
        ],
        practiceTask: '整理优化自己的代码库'
      },
      {
        day: 30,
        week: 5,
        title: '发表准备',
        coreContent: [
          '数据分析报告撰写',
          '代码开源与Git使用',
          '发表流程介绍'
        ],
        practiceTask: '完成一个可发表的分析报告',
        codeExample: `# Day 30: 数据分析报告生成模板

import pandas as pd
import numpy as np
from scipy import stats

print("=" * 70)
print("数据分析报告模板（适用于论文发表）")
print("=" * 70)

# ==================== 报告摘要 ====================
print("【摘要 (Abstract)】")
print("本研究对XXX数据进行了分析。主要发现：")
print("1. 样本量为XXX，平均值为XXX")
print("2. 发现了XXX的显著差异 (p < 0.05)")
print("3. 相关性分析显示XXX与XXX呈正相关 (r = 0.XX)")

# ==================== 数据概览 ====================
print("【1. 数据描述 (Data Description)】")
np.random.seed(123)
sample_data = np.random.normal(100, 15, 50)

n = len(sample_data)
mean = np.mean(sample_data)
std = np.std(sample_data, ddof=1)
median = np.median(sample_data)
min_val = np.min(sample_data)
max_val = np.max(sample_data)
q1, q3 = np.percentile(sample_data, [25, 75])

print(f"样本量 (N): {n}")
print(f"均值 (Mean): {mean:.2f}")
print(f"标准差 (SD): {std:.2f}")
print(f"中位数 (Median): {median:.2f}")
print(f"范围 (Range): {min_val:.2f} - {max_val:.2f}")
print(f"四分位距 (IQR): {q3-q1:.2f}")

# ==================== 统计检验 ====================
print("【2. 统计检验结果 (Statistical Analysis)】")

# 正态性检验
statistic, p_normal = stats.shapiro(sample_data)
print("正态性检验 (Shapiro-Wilk):")
print(f"W = {statistic:.4f}, p = {p_normal:.4f}")
conclusion = "符合" if p_normal > 0.05 else "不符合"
print(f"结论: 数据{conclusion}正态分布")

# 单样本t检验
test_value = 95
t_stat, p_ttest = stats.ttest_1samp(sample_data, test_value)
print(f"单样本t检验 (与{test_value}比较):")
print(f"t = {t_stat:.4f}, p = {p_ttest:.4f}")
if t_stat > 0 and p_ttest < 0.05:
    t_conclusion = "显著高于"
elif t_stat < 0 and p_ttest < 0.05:
    t_conclusion = "显著低于"
else:
    t_conclusion = "与"
print(f"结论: 样本均值{t_conclusion}总体均值{test_value}")

# ==================== 相关性分析 ====================
print("【3. 相关性分析 (Correlation Analysis)】")
x = np.random.normal(50, 10, 50)
y = x + np.random.normal(0, 5, 50)
r, p_corr = stats.pearsonr(x, y)
r2 = r ** 2

print(f"Pearson相关系数: r = {r:.4f}")
print(f"决定系数: R2 = {r2:.4f}")
print(f"显著性: p = {p_corr:.4f}")
corr_conclusion = "存在" if p_corr < 0.05 else "不存在"
print(f"结论: 两变量{corr_conclusion}显著相关性")

# ==================== 结论 ====================
print("【4. 结论 (Conclusions)】")
print("1. 描述性统计显示...")
print("2. 假设检验表明...")
print("3. 相关性分析揭示...")
print("4. 研究局限性: 样本量较小，未控制混杂变量")
print("5. 未来研究方向: 增加样本量，开展纵向研究")

print("" + "=" * 70)
print("报告结束 | Report Generated Successfully")
print("=" * 70)`
      }
    ]
  }
];

export const learningGoals = [
  '掌握Python编程基础',
  '熟练数据处理与分析（pandas、numpy）',
  '掌握统计分析与可视化',
  '能够完成科研数据分析全流程',
  '具备独立发表论文的数据分析能力'
];

export const dailySchedule = {
  morning: { time: '上午', content: '学习新概念+看教程', duration: '1-2小时' },
  afternoon: { time: '下午', content: '动手编程+练习', duration: '2-3小时' },
  evening: { time: '晚上', content: '复习总结+记录笔记', duration: '1小时' }
};

export const resources = {
  books: [
    { name: 'Python for Data Analysis', desc: '数据分析经典' },
    { name: 'Python编程：从入门到实践', desc: '入门友好' },
    { name: '统计学习方法 - 李航', desc: '统计学习理论' }
  ],
  courses: [
    { name: 'Coursera: Python for Everybody', desc: '零基础入门' },
    { name: 'B站：廖雪峰Python教程', desc: '中文免费' }
  ],
  practice: [
    { name: 'LeetCode', desc: '编程练习' },
    { name: 'Kaggle', desc: '数据科学实战' }
  ]
};
