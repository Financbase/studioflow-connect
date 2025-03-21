
import { useVersionPersistence } from './useVersionPersistence';
import { useVersionFiltering } from './useVersionFiltering';
import { useVersionOperations } from './useVersionOperations';
import { useVersionImportExport } from './useVersionImportExport';

export function useColorVersionManager() {
  const { 
    versions, 
    currentVersionId, 
    persistVersions, 
    persistCurrentVersionId 
  } = useVersionPersistence();
  
  const { 
    filters, 
    filteredVersions, 
    updateFilters 
  } = useVersionFiltering(versions);
  
  const { 
    saveVersion, 
    switchToVersion, 
    deleteVersion, 
    updateVersion, 
    toggleFavorite,
    duplicateVersion
  } = useVersionOperations(versions, currentVersionId, persistVersions, persistCurrentVersionId);
  
  const { 
    exportVersion, 
    importVersion 
  } = useVersionImportExport(versions, persistVersions);
  
  // Get the current version
  const getCurrentVersion = () => {
    if (!currentVersionId) return null;
    return versions.find(v => v.id === currentVersionId) || null;
  };
  
  return {
    // State
    versions,
    filteredVersions,
    currentVersionId,
    filters,
    
    // Version management
    saveVersion,
    switchToVersion,
    deleteVersion,
    updateVersion,
    toggleFavorite,
    duplicateVersion,
    getCurrentVersion,
    
    // Filtering
    updateFilters,
    
    // Import/Export
    exportVersion,
    importVersion
  };
}
