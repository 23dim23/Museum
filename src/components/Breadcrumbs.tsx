import React from 'react';
import { useApp } from '../context/AppContext';
import { SITE_NAVIGATION } from '../data/initialData';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs: React.FC = () => {
  const { currentPath, navigate, language } = useApp();

  if (currentPath === '/' || !currentPath) return null;

  const pathParts = currentPath.split('/').filter(Boolean);
  
  // Find matching titles
  const crumbs: { label: string; path: string }[] = [
    { label: language === 'ru' ? 'Главная' : 'Home', path: '/' }
  ];

  if (pathParts.length > 0) {
    const parentId = pathParts[0];
    const parentItem = SITE_NAVIGATION.find(item => item.id === parentId);
    
    if (parentItem) {
      crumbs.push({
        label: language === 'ru' ? parentItem.title : parentItem.titleEn,
        path: `/${parentItem.id}`
      });

      if (pathParts.length > 1) {
        const childId = pathParts[1];
        const childItem = parentItem.children?.find(c => c.id === childId || c.path.endsWith(childId));
        if (childItem) {
          crumbs.push({
            label: language === 'ru' ? childItem.title : childItem.titleEn,
            path: childItem.path
          });
        } else {
          crumbs.push({
            label: childId,
            path: currentPath
          });
        }
      }
    } else {
      crumbs.push({
        label: pathParts[0],
        path: currentPath
      });
    }
  }

  return (
    <nav
      aria-label="Навигационная цепочка (хлебные крошки)"
      className="bg-[#F5EFE6] border-b border-[#E8DFC8] py-2.5 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto flex items-center flex-wrap gap-1.5 text-xs text-[#705D50]">
        {crumbs.map((crumb, idx) => {
          const isLast = idx === crumbs.length - 1;
          return (
            <React.Fragment key={crumb.path + idx}>
              {idx > 0 && <ChevronRight className="w-3 h-3 text-[#A89884]" aria-hidden="true" />}
              {isLast ? (
                <span className="font-semibold text-[#2C241E] truncate max-w-[260px] sm:max-w-none" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <button
                  onClick={() => navigate(crumb.path)}
                  className="hover:text-[#8C4A1D] hover:underline transition flex items-center gap-1"
                >
                  {idx === 0 && <Home className="w-3 h-3" />}
                  <span>{crumb.label}</span>
                </button>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};
