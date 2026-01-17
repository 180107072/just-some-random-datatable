import { ComponentExample } from "@/components/component-example";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  IconArrowLeft,
  IconDots,
  IconLogout,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";

function Nav() {
  return (
    <nav
      className="sm:px-6 pb-1 lg:pt-6 lg:px-12 w-full rounded-xl"
      aria-label="Primary"
    >
      <div className="w-full  flex items-center px-1.5 justify-center h-10">
        <ButtonGroup className="w-full flex" aria-label="Navigation bar">
          <ButtonGroup className="hidden sm:flex" aria-label="Back navigation">
            <Button variant="outline" size="icon" aria-label="Go Back">
              <IconArrowLeft aria-hidden="true" />
            </Button>
          </ButtonGroup>
          <ButtonGroup aria-label="Sections">
            <Button variant="outline">Scheduled inspection</Button>
            <Button variant="outline" className="bg-input" aria-current="page">
              Introduction
            </Button>
            <Button variant="outline">Changes</Button>
          </ButtonGroup>
          <ButtonGroup className="ml-auto" aria-label="User actions">
            <Button variant="outline">
              <IconUser aria-hidden="true" /> Me
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="More Options"
                  >
                    <IconDots aria-hidden="true" />
                  </Button>
                }
                className="ml-auto"
              />
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <IconSettings aria-hidden="true" />
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem variant="destructive">
                    <IconLogout aria-hidden="true" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
        </ButtonGroup>
      </div>
    </nav>
  );
}

export function App() {
  return (
    <div className="flex overflow-hidden flex-col h-svh">
      <Nav />
      <ComponentExample />
    </div>
  );
}

export default App;
