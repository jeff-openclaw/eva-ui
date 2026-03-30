import type { Meta, StoryObj } from '@storybook/react';
import { HudSidebar } from './HudSidebar';

const meta: Meta<typeof HudSidebar> = {
  title: 'Chrome/HudSidebar',
  component: HudSidebar,
  parameters: { backgrounds: { default: 'eva-void' } },
  decorators: [
    (Story) => (
      <div style={{ width: 200, height: 500 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof HudSidebar>;

export const Default: Story = {
  render: () => (
    <HudSidebar>
      <HudSidebar.Logo />
      <HudSidebar.Nav>
        <HudSidebar.NavItem label="Dashboard" active />
        <HudSidebar.NavItem label="MAGI Status" />
        <HudSidebar.NavItem label="Pilot Sync" />
        <HudSidebar.NavItem label="Alerts" />
      </HudSidebar.Nav>
      <HudSidebar.Footer>NERV SYSTEM v3.01</HudSidebar.Footer>
    </HudSidebar>
  ),
};

export const WithHazardAccent: Story = {
  render: () => (
    <HudSidebar hazardAccent>
      <HudSidebar.Logo>SEELE</HudSidebar.Logo>
      <HudSidebar.Nav>
        <HudSidebar.NavItem label="Monoliths" active />
        <HudSidebar.NavItem label="Scenario" />
        <HudSidebar.NavItem label="Dead Sea" />
      </HudSidebar.Nav>
      <HudSidebar.Footer>COUNCIL v7.0</HudSidebar.Footer>
    </HudSidebar>
  ),
};

export const WithSections: Story = {
  render: () => (
    <HudSidebar>
      <HudSidebar.Logo />
      <HudSidebar.Nav>
        <HudSidebar.Section label="Operations">
          <HudSidebar.NavItem label="Dashboard" active />
          <HudSidebar.NavItem label="Alerts" />
        </HudSidebar.Section>
        <HudSidebar.Section label="Systems">
          <HudSidebar.NavItem label="MAGI" />
          <HudSidebar.NavItem label="Eva Units" />
          <HudSidebar.NavItem label="AT Field" />
        </HudSidebar.Section>
      </HudSidebar.Nav>
      <HudSidebar.Footer>NERV SYSTEM v3.01</HudSidebar.Footer>
    </HudSidebar>
  ),
};

export const RightPosition: Story = {
  render: () => (
    <HudSidebar position="right">
      <HudSidebar.Logo>STATUS</HudSidebar.Logo>
      <HudSidebar.Nav>
        <HudSidebar.NavItem label="Unit 01" active />
        <HudSidebar.NavItem label="Unit 02" />
        <HudSidebar.NavItem label="Unit 00" />
      </HudSidebar.Nav>
    </HudSidebar>
  ),
};
