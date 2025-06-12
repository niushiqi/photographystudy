// 定义进度状态类型
export type ProgressStatus = 'notStarted' | 'inProgress' | 'completed';

// 定义进度记录类型
export type ProgressRecord = Record<string, ProgressStatus>;

// 定义模块类型
export type Module = {
  id: string;
  name: string;
  icon?: string;
  description?: string;
};

// 定义课程类型
export type Course = {
  id: string;
  name: string;
  modules: Module[];
};

// 本地存储键名
const PROGRESS_STORAGE_KEY = 'photography_learning_progress';

/**
 * 获取用户学习进度
 * @param courseId 课程ID
 * @returns 课程的学习进度记录
 */
export function getUserProgress(courseId: string): ProgressRecord {
  try {
    // 从本地存储读取进度数据
    const storedProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!storedProgress) return {};
    
    const allProgress = JSON.parse(storedProgress);
    return allProgress[courseId] || {};
  } catch (error) {
    console.error('Error reading progress data:', error);
    return {};
  }
}

/**
 * 更新用户学习进度
 * @param courseId 课程ID
 * @param moduleId 模块ID
 * @param status 进度状态
 */
export function updateUserProgress(
  courseId: string, 
  moduleId: string, 
  status: ProgressStatus
): void {
  try {
    // 读取现有进度数据
    const storedProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
    const allProgress = storedProgress ? JSON.parse(storedProgress) : {};
    
    // 更新指定课程和模块的进度
    if (!allProgress[courseId]) {
      allProgress[courseId] = {};
    }
    
    allProgress[courseId][moduleId] = status;
    
    // 保存更新后的进度数据
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(allProgress));
  } catch (error) {
    console.error('Error updating progress data:', error);
  }
}

/**
 * 计算课程的总体完成百分比
 * @param courseId 课程ID
 * @param modules 课程包含的所有模块
 * @returns 完成百分比（0-100）
 */
export function calculateCourseCompletion(
  courseId: string,
  modules: Module[]
): number {
  const progress = getUserProgress(courseId);
  if (!progress || !modules.length) return 0;
  
  let completedCount = 0;
  let inProgressCount = 0;
  
  modules.forEach(module => {
    if (progress[module.id] === 'completed') {
      completedCount++;
    } else if (progress[module.id] === 'inProgress') {
      inProgressCount += 0.5; // 进行中的模块算作半个完成
    }
  });
  
  return Math.min(100, Math.round(((completedCount + inProgressCount) / modules.length) * 100));
}

/**
 * 重置课程进度
 * @param courseId 课程ID
 */
export function resetCourseProgress(courseId: string): void {
  try {
    const storedProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!storedProgress) return;
    
    const allProgress = JSON.parse(storedProgress);
    
    // 删除指定课程的进度数据
    if (allProgress[courseId]) {
      delete allProgress[courseId];
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(allProgress));
    }
  } catch (error) {
    console.error('Error resetting course progress:', error);
  }
}

/**
 * 获取下一个推荐学习的模块
 * @param courseId 课程ID
 * @param modules 课程包含的所有模块
 * @returns 推荐的下一个模块ID，如果全部完成则返回null
 */
export function getNextRecommendedModule(
  courseId: string,
  modules: Module[]
): string | null {
  const progress = getUserProgress(courseId);
  
  // 首先查找进行中的模块
  const inProgressModule = modules.find(module => progress[module.id] === 'inProgress');
  if (inProgressModule) return inProgressModule.id;
  
  // 然后查找第一个未开始的模块
  const notStartedModule = modules.find(module => !progress[module.id] || progress[module.id] === 'notStarted');
  if (notStartedModule) return notStartedModule.id;
  
  // 如果所有模块都已完成，返回null
  return null;
}

/**
 * 检查指定模块是否可以开始学习（前置条件已满足）
 * @param courseId 课程ID
 * @param moduleId 模块ID
 * @param modules 课程包含的所有模块（按顺序排列）
 * @returns 是否可以开始学习
 */
export function isModuleAvailable(
  courseId: string,
  moduleId: string,
  modules: Module[]
): boolean {
  const moduleIndex = modules.findIndex(m => m.id === moduleId);
  if (moduleIndex === -1) return false;
  
  // 第一个模块始终可用
  if (moduleIndex === 0) return true;
  
  const progress = getUserProgress(courseId);
  const prevModule = modules[moduleIndex - 1];
  
  // 如果前一个模块已完成或正在进行中，则当前模块可用
  return ['completed', 'inProgress'].includes(progress[prevModule.id] || '');
}

/**
 * 导出课程进度数据（用于备份或迁移）
 * @returns 所有课程的进度数据JSON字符串
 */
export function exportProgressData(): string {
  try {
    const storedProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
    return storedProgress || '{}';
  } catch (error) {
    console.error('Error exporting progress data:', error);
    return '{}';
  }
}

/**
 * 导入课程进度数据
 * @param jsonData 进度数据JSON字符串
 * @param merge 是否与现有数据合并（true）或覆盖（false）
 * @returns 是否导入成功
 */
export function importProgressData(jsonData: string, merge: boolean = true): boolean {
  try {
    const importedProgress = JSON.parse(jsonData);
    
    if (merge) {
      // 合并现有数据
      const storedProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
      const currentProgress = storedProgress ? JSON.parse(storedProgress) : {};
      
      const mergedProgress = { ...currentProgress };
      
      // 合并每个课程的进度
      Object.keys(importedProgress).forEach(courseId => {
        mergedProgress[courseId] = {
          ...(mergedProgress[courseId] || {}),
          ...importedProgress[courseId]
        };
      });
      
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(mergedProgress));
    } else {
      // 直接覆盖
      localStorage.setItem(PROGRESS_STORAGE_KEY, jsonData);
    }
    
    return true;
  } catch (error) {
    console.error('Error importing progress data:', error);
    return false;
  }
} 