'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { PageHeader } from "@/components/ui/PageHeader";

// 动态范围分析实验室组件
const DynamicRangeModule = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Badge className="w-fit mb-2" variant="outline">基础概念</Badge>
            <CardTitle>动态范围可视化</CardTitle>
            <CardDescription>理解相机传感器捕捉明暗范围的能力</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-gradient-to-r from-black via-gray-500 to-white rounded-lg flex items-center justify-center relative">
              <div className="absolute inset-0 flex items-center">
                <div className="h-1 w-full bg-neutral-200">
                  <div className="h-full w-3/4 bg-blue-500 relative">
                    <div className="absolute -top-7 left-0 text-xs">暗部细节</div>
                    <div className="absolute -bottom-7 left-0 text-xs">0 EV</div>
                    <div className="absolute -top-7 right-0 text-xs">高光细节</div>
                    <div className="absolute -bottom-7 right-0 text-xs">+14 EV</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <Badge className="w-fit mb-2" variant="outline">技术比较</Badge>
            <CardTitle>传感器动态范围比较</CardTitle>
            <CardDescription>不同相机系统的动态范围性能表现</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>入门级APS-C</span>
                <div className="w-3/5 bg-neutral-200 h-4 rounded-full">
                  <div className="bg-blue-500 h-4 rounded-full" style={{width: '60%'}}></div>
                </div>
                <span>~10-11 EV</span>
              </div>
              <div className="flex justify-between items-center">
                <span>专业级全画幅</span>
                <div className="w-3/5 bg-neutral-200 h-4 rounded-full">
                  <div className="bg-blue-500 h-4 rounded-full" style={{width: '85%'}}></div>
                </div>
                <span>~14-15 EV</span>
              </div>
              <div className="flex justify-between items-center">
                <span>中画幅</span>
                <div className="w-3/5 bg-neutral-200 h-4 rounded-full">
                  <div className="bg-blue-500 h-4 rounded-full" style={{width: '95%'}}></div>
                </div>
                <span>~15-16 EV</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <Badge className="w-fit mb-2" variant="outline">实验工具</Badge>
          <CardTitle>动态范围计算器</CardTitle>
          <CardDescription>根据相机型号和ISO计算预估动态范围</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">相机类型</label>
              <select className="w-full p-2 border rounded-md bg-transparent">
                <option>入门级APS-C相机</option>
                <option>中端APS-C相机</option>
                <option>专业级全画幅相机</option>
                <option>中画幅相机</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">ISO值</label>
                <span className="text-sm">ISO 100</span>
              </div>
              <Slider defaultValue={[100]} min={100} max={6400} step={100} />
            </div>
            
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
              <div className="flex justify-between mb-2">
                <span>预估动态范围:</span>
                <span className="font-bold">14.5 EV</span>
              </div>
              <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-6 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-6 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// 景深物理模型组件
const DepthOfFieldModule = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Badge className="w-fit mb-2" variant="outline">基础原理</Badge>
            <CardTitle>景深物理原理</CardTitle>
            <CardDescription>理解景深形成的物理学基础</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-48 border rounded-lg overflow-hidden">
              <div className="absolute w-full h-full flex items-center justify-center">
                <div className="relative w-3/4 h-2 bg-neutral-200">
                  <div className="absolute left-1/2 top-1/2 w-2 h-2 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute left-1/3 top-1/2 w-4 h-4 border-2 border-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute left-2/3 top-1/2 w-4 h-4 border-2 border-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              </div>
              <div className="absolute bottom-2 left-0 right-0 text-center text-sm">
                焦点前后的可接受清晰度范围构成景深
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <Badge className="w-fit mb-2" variant="outline">影响因素</Badge>
            <CardTitle>影响景深的关键因素</CardTitle>
            <CardDescription>探索决定景深大小的技术参数</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Badge variant="outline" className="mt-0.5">光圈</Badge>
                <span>光圈越小(F值越大)，景深越大</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge variant="outline" className="mt-0.5">焦距</Badge>
                <span>焦距越长，景深越浅</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge variant="outline" className="mt-0.5">对焦距离</Badge>
                <span>对焦距离越近，景深越浅</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge variant="outline" className="mt-0.5">传感器尺寸</Badge>
                <span>传感器越大，景深越浅</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <Badge className="w-fit mb-2" variant="outline">实验工具</Badge>
          <CardTitle>景深计算器</CardTitle>
          <CardDescription>根据拍摄参数计算前后景深范围</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">光圈值</label>
              <select className="w-full p-2 border rounded-md bg-transparent">
                <option>f/1.4</option>
                <option>f/2.0</option>
                <option>f/2.8</option>
                <option>f/4.0</option>
                <option>f/5.6</option>
                <option>f/8.0</option>
                <option>f/11</option>
                <option>f/16</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">焦距 (mm)</label>
              <select className="w-full p-2 border rounded-md bg-transparent">
                <option>24mm</option>
                <option>35mm</option>
                <option>50mm</option>
                <option>85mm</option>
                <option>135mm</option>
                <option>200mm</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">对焦距离 (m)</label>
                <span className="text-sm">2.5m</span>
              </div>
              <Slider defaultValue={[2.5]} min={0.5} max={10} step={0.1} />
            </div>
          </div>
          
          <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-sm text-neutral-500">前景深</div>
                <div className="font-bold">0.45m</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-neutral-500">总景深范围</div>
                <div className="font-bold">1.25m</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-neutral-500">后景深</div>
                <div className="font-bold">0.80m</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// 镜头光学特性分析器组件
const LensOpticsModule = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Badge className="w-fit mb-2" variant="outline">光学特性</Badge>
            <CardTitle>MTF曲线解读</CardTitle>
            <CardDescription>了解镜头的分辨率和对比度表现</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-white dark:bg-neutral-800 rounded-lg p-4 relative">
              <div className="absolute inset-0 p-4">
                <div className="h-full w-full">
                  <div className="border-b border-l h-full w-full relative">
                    <div className="absolute -left-6 top-0 text-xs">1.0</div>
                    <div className="absolute -left-6 bottom-0 text-xs">0.0</div>
                    <div className="absolute -bottom-6 left-0 text-xs">中心</div>
                    <div className="absolute -bottom-6 right-0 text-xs">边缘</div>
                    
                    {/* 实线代表10线对/毫米 */}
                    <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M0,10 C20,15 40,40 100,80" stroke="blue" fill="none" strokeWidth="2"/>
                    </svg>
                    
                    {/* 虚线代表30线对/毫米 */}
                    <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M0,40 C10,45 40,70 100,95" stroke="red" fill="none" strokeWidth="2" strokeDasharray="4"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-blue-500"></div>
                <span>10线对/毫米 (低频细节)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-red-500 border-dashed"></div>
                <span>30线对/毫米 (高频细节)</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <Badge className="w-fit mb-2" variant="outline">光学缺陷</Badge>
            <CardTitle>常见光学缺陷分析</CardTitle>
            <CardDescription>理解各类光学缺陷的形成原因与表现</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neutral-300 to-neutral-500 flex items-center justify-center text-white">CA</div>
                <div>
                  <h4 className="font-medium">色差</h4>
                  <p className="text-sm text-neutral-500">不同波长的光在透镜中折射角度不同导致的色彩偏移</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neutral-300 to-neutral-500 flex items-center justify-center text-white">DT</div>
                <div>
                  <h4 className="font-medium">畸变</h4>
                  <p className="text-sm text-neutral-500">桶形、枕形畸变导致直线在图像中弯曲变形</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neutral-300 to-neutral-500 flex items-center justify-center text-white">VG</div>
                <div>
                  <h4 className="font-medium">渐晕</h4>
                  <p className="text-sm text-neutral-500">图像边缘亮度降低，在大光圈下更明显</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <Badge className="w-fit mb-2" variant="outline">互动工具</Badge>
          <CardTitle>镜头特性模拟器</CardTitle>
          <CardDescription>交互式体验不同光学特性对图像的影响</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">畸变控制</label>
                  <span className="text-sm">0%</span>
                </div>
                <Slider defaultValue={[0]} min={-100} max={100} step={1} />
                <div className="flex justify-between text-xs text-neutral-500">
                  <span>桶形畸变</span>
                  <span>无畸变</span>
                  <span>枕形畸变</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">色差控制</label>
                  <span className="text-sm">0%</span>
                </div>
                <Slider defaultValue={[0]} min={0} max={100} step={1} />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">渐晕控制</label>
                  <span className="text-sm">0%</span>
                </div>
                <Slider defaultValue={[0]} min={0} max={100} step={1} />
              </div>
            </div>
            
            <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden">
              <div className="relative h-60">
                <div className="absolute inset-0 bg-[url('/images/techniques/simulator/grid-pattern.png')] bg-center bg-no-repeat bg-contain opacity-80">
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-sm text-neutral-500">
                  图像预览区域（调整参数查看变化效果）
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// 测光系统技术解析组件
const MeteringSystemModule = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Badge className="w-fit mb-2" variant="outline">测光原理</Badge>
            <CardTitle>测光系统工作原理</CardTitle>
            <CardDescription>了解相机如何测量场景亮度</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-white dark:bg-neutral-800 rounded-lg p-4 relative flex items-center justify-center">
              <div className="relative w-32 h-32 border-2 border-dashed border-neutral-400 rounded-full">
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className={`flex items-center justify-center ${i === 4 ? 'bg-blue-500 bg-opacity-50' : ''}`}>
                      {i === 4 && <span className="text-xs text-white">中央重点</span>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-2 left-0 right-0 text-center text-sm">
                相机测光系统检测并分析进入相机的光线强度
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <Badge className="w-fit mb-2" variant="outline">测光模式</Badge>
            <CardTitle>常见测光模式比较</CardTitle>
            <CardDescription>不同测光模式的工作方式与适用场景</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-md bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-medium">点测光</h4>
                  <p className="text-sm text-neutral-500">只测量取景器中心1-5%的区域，适合逆光或高对比度场景</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-md bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-500 rounded-full opacity-70"></div>
                </div>
                <div>
                  <h4 className="font-medium">中央重点测光</h4>
                  <p className="text-sm text-neutral-500">以中心区域为重点测量整个画面，最常用的传统测光方式</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-md bg-neutral-200 dark:bg-neutral-700 grid grid-cols-2 grid-rows-2 gap-0.5 p-1">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-blue-500 opacity-60"></div>
                  ))}
                </div>
                <div>
                  <h4 className="font-medium">矩阵测光</h4>
                  <p className="text-sm text-neutral-500">将画面分割为多个区域进行测量，现代相机的默认测光模式</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <Badge className="w-fit mb-2" variant="outline">互动工具</Badge>
          <CardTitle>测光模式模拟器</CardTitle>
          <CardDescription>可视化不同测光模式的效果差异</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">选择测光模式</label>
                <div className="grid grid-cols-3 gap-2">
                  <button className="p-2 border rounded-md bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-800">点测光</button>
                  <button className="p-2 border rounded-md">中央重点</button>
                  <button className="p-2 border rounded-md">矩阵测光</button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">场景对比度</label>
                  <span className="text-sm">中等</span>
                </div>
                <Slider defaultValue={[50]} min={0} max={100} step={1} />
                <div className="flex justify-between text-xs text-neutral-500">
                  <span>低对比度</span>
                  <span>高对比度</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">主体位置</label>
                  <span className="text-sm">中心</span>
                </div>
                <Slider defaultValue={[50]} min={0} max={100} step={1} />
                <div className="flex justify-between text-xs text-neutral-500">
                  <span>左侧</span>
                  <span>右侧</span>
                </div>
              </div>
            </div>
            
            <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden">
              <div className="relative h-60">
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-400 dark:from-neutral-700 dark:to-neutral-900">
                  <div className="absolute left-1/2 top-1/2 w-16 h-16 border-2 border-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                <div className="absolute bottom-2 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center text-sm">
                  测光结果：+0.3 EV 曝光补偿
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// 自动对焦技术剖析组件
const AutofocusTechnologyModule = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Badge className="w-fit mb-2" variant="outline">技术原理</Badge>
            <CardTitle>自动对焦工作原理</CardTitle>
            <CardDescription>了解不同对焦系统的技术机制</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-300 to-blue-500 flex items-center justify-center text-white text-xs">PD</div>
                <div>
                  <h4 className="font-medium">相位检测对焦</h4>
                  <p className="text-sm text-neutral-500">通过测量光线相位差快速确定对焦方向和距离，DSLR常用技术</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-300 to-green-500 flex items-center justify-center text-white text-xs">CD</div>
                <div>
                  <h4 className="font-medium">对比度检测对焦</h4>
                  <p className="text-sm text-neutral-500">通过寻找最大图像对比度确定焦点，无镜相机早期技术</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-xs">DP</div>
                <div>
                  <h4 className="font-medium">双像素CMOS对焦</h4>
                  <p className="text-sm text-neutral-500">传感器每个像素分为两部分实现相位检测，无镜相机常用技术</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <Badge className="w-fit mb-2" variant="outline">对焦模式</Badge>
            <CardTitle>不同对焦模式的应用</CardTitle>
            <CardDescription>选择合适的对焦模式提升拍摄效率</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <h4 className="font-medium">单次对焦 (AF-S / One-Shot AF)</h4>
                <p className="text-sm text-neutral-500 mt-1">适用于静态主体，对焦后锁定</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-neutral-500">适用场景：</span>
                  <Badge variant="outline" className="text-xs">风景</Badge>
                  <Badge variant="outline" className="text-xs">建筑</Badge>
                  <Badge variant="outline" className="text-xs">静物</Badge>
                </div>
              </div>
              
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium">连续对焦 (AF-C / AI Servo)</h4>
                <p className="text-sm text-neutral-500 mt-1">不断调整对焦，跟踪移动主体</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-neutral-500">适用场景：</span>
                  <Badge variant="outline" className="text-xs">运动</Badge>
                  <Badge variant="outline" className="text-xs">野生动物</Badge>
                  <Badge variant="outline" className="text-xs">儿童</Badge>
                </div>
              </div>
              
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium">自动对焦 (AF-A / AI Focus)</h4>
                <p className="text-sm text-neutral-500 mt-1">相机自动在单次和连续对焦间切换</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-neutral-500">适用场景：</span>
                  <Badge variant="outline" className="text-xs">日常拍摄</Badge>
                  <Badge variant="outline" className="text-xs">多变场景</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <Badge className="w-fit mb-2" variant="outline">实用工具</Badge>
          <CardTitle>对焦系统测试与分析</CardTitle>
          <CardDescription>深入了解对焦系统性能与限制</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">对焦点覆盖范围</h4>
              <div className="relative aspect-video bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden border">
                <div className="absolute inset-0 grid grid-cols-7 grid-rows-5 gap-2 p-4">
                  {[...Array(35)].map((_, i) => {
                    const isActive = [10, 11, 12, 13, 16, 17, 18, 19, 23, 24, 25].includes(i);
                    return (
                      <div 
                        key={i} 
                        className={`border rounded-sm ${isActive ? 'border-red-500 bg-red-500 bg-opacity-20' : 'border-neutral-300 dark:border-neutral-600'}`}
                      ></div>
                    );
                  })}
                </div>
                <div className="absolute bottom-2 right-2 text-xs bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                  60% 画面覆盖
                </div>
              </div>
              
              <h4 className="font-medium mt-4 mb-2">弱光对焦能力</h4>
              <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-500 to-green-500" style={{width: '70%'}}></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>-3 EV</span>
                <span>-6 EV</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">对焦速度比较</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>相位检测 (OVF)</span>
                    <span>0.08秒</span>
                  </div>
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{width: '90%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>双像素CMOS</span>
                    <span>0.10秒</span>
                  </div>
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500" style={{width: '85%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>对比度检测</span>
                    <span>0.25秒</span>
                  </div>
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{width: '60%'}}></div>
                  </div>
                </div>
              </div>
              
              <h4 className="font-medium mt-4 mb-2">对焦准确性</h4>
              <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-sm">双像素CMOS</span>
                  <div className="flex-1 flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default function AdvancedPage() {
  return (
    <div className="container mx-auto px-4 pb-16 pt-24">
      <PageHeader
        title="技术进阶"
        description="揭示摄影技术原理与机制的深度解析平台，帮助您从会用升级到懂原理。"
      />
      
      {/* Tabs组件包装所有子模块 */}
      <Tabs defaultValue="dynamic-range" className="w-full">
        <div className="sticky top-20 bg-background/95 backdrop-blur-sm pt-2 pb-4 z-20">
          <TabsList className="grid grid-cols-5 max-w-4xl mx-auto">
            <TabsTrigger value="dynamic-range" className="py-3">
              <span className="flex flex-col items-center gap-1">
                <span className="text-lg">📊</span>
                <span className="text-sm">动态范围分析</span>
              </span>
            </TabsTrigger>
            <TabsTrigger value="depth-of-field" className="py-3">
              <span className="flex flex-col items-center gap-1">
                <span className="text-lg">🔍</span>
                <span className="text-sm">景深物理模型</span>
              </span>
            </TabsTrigger>
            <TabsTrigger value="lens-optics" className="py-3">
              <span className="flex flex-col items-center gap-1">
                <span className="text-lg">🔎</span>
                <span className="text-sm">镜头光学分析</span>
              </span>
            </TabsTrigger>
            <TabsTrigger value="metering-system" className="py-3">
              <span className="flex flex-col items-center gap-1">
                <span className="text-lg">📝</span>
                <span className="text-sm">测光系统解析</span>
              </span>
            </TabsTrigger>
            <TabsTrigger value="autofocus" className="py-3">
              <span className="flex flex-col items-center gap-1">
                <span className="text-lg">🎯</span>
                <span className="text-sm">自动对焦剖析</span>
              </span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="dynamic-range" className="mt-6">
          <DynamicRangeModule />
        </TabsContent>
        
        <TabsContent value="depth-of-field" className="mt-6">
          <DepthOfFieldModule />
        </TabsContent>
        
        <TabsContent value="lens-optics" className="mt-6">
          <LensOpticsModule />
        </TabsContent>
        
        <TabsContent value="metering-system" className="mt-6">
          <MeteringSystemModule />
        </TabsContent>
        
        <TabsContent value="autofocus" className="mt-6">
          <AutofocusTechnologyModule />
        </TabsContent>
      </Tabs>
    </div>
  );
} 