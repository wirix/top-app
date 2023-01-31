import { MenuItem } from '../interfaces/menu.inteface';
import { createContext, PropsWithChildren, useState } from "react";
import { TopLevelCategory } from '../interfaces/page.interface';

export interface IAppContext {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  setMenu?: (newMenu: MenuItem[]) => void;
}

export const AppContext = createContext<IAppContext>({
  menu: [],
  firstCategory: TopLevelCategory.Courses,
});

// IAppContext & { children: ReactNode } ====== PropsWithChildren<IAppContext>
// провайдер для управления контекстом
export const AppContextProvider = ({ children, menu, firstCategory }: PropsWithChildren<IAppContext>): JSX.Element => {
  const [menuState, setMenuState] = useState<MenuItem[]>(menu);
  // в value не закидываем setMenuState, чтобы при вызове setMenu вызывался на месте setMenuState и обновлял menuState для всех компонетов
  const setMenu = (newMenu: MenuItem[]) => {
    setMenuState(newMenu);
  };

  return <AppContext.Provider value={ { menu: menuState, firstCategory, setMenu } }>
    { children }
    </AppContext.Provider>;
};