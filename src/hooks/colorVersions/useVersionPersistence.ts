
import { useState, useEffect } from 'react';
import { ColorVersion } from './types';

export function useVersionPersistence() {
  const [versions, setVersions] = useState<ColorVersion[]>([]);
  const [currentVersionId, setCurrentVersionId] = useState<string | null>(null);
  
  // Load saved versions from localStorage
  useEffect(() => {
    const savedVersions = localStorage.getItem('theme_color_versions');
    if (savedVersions) {
      try {
        const parsedVersions = JSON.parse(savedVersions) as ColorVersion[];
        setVersions(parsedVersions);
      } catch (e) {
        console.error('Failed to parse saved theme versions', e);
      }
    }
    
    const currentId = localStorage.getItem('current_theme_version_id');
    if (currentId) {
      setCurrentVersionId(currentId);
    }
  }, []);
  
  // Save versions to localStorage
  const persistVersions = (updatedVersions: ColorVersion[]) => {
    setVersions(updatedVersions);
    localStorage.setItem('theme_color_versions', JSON.stringify(updatedVersions));
  };
  
  // Update current version ID in localStorage
  const persistCurrentVersionId = (versionId: string) => {
    setCurrentVersionId(versionId);
    localStorage.setItem('current_theme_version_id', versionId);
  };
  
  return {
    versions,
    currentVersionId, 
    persistVersions,
    persistCurrentVersionId
  };
}
