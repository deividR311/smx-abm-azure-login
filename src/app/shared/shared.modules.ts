import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { IconComponent } from './components/icon/icon.component';
import { MenuComponent } from './components/menu/menu.component';
import { RutDirective } from './directives/rut.directive';
import { MaterialModule } from './material/material.module';
import { SelectRolComponent } from './select-rol/select-rol.component';
const MODAL_COMPONENTS: any = [];
const COMPONENTS_LIST: any = [];
const COMPONENTS_LAYOUT: any = [
  HeaderComponent,
  FooterComponent,
  BreadcrumbsComponent,
  MenuComponent,
  IconComponent,
  SelectRolComponent
];

@NgModule({
  declarations: [
    COMPONENTS_LIST,
    MODAL_COMPONENTS,
    COMPONENTS_LAYOUT,
    RutDirective
  ],
  entryComponents: [
    MODAL_COMPONENTS,
    COMPONENTS_LAYOUT
  ],
  exports: [
    COMPONENTS_LIST,
    MODAL_COMPONENTS,
    COMPONENTS_LAYOUT,
    MaterialModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RutDirective
  ],
  imports: [
    MaterialModule,
    TranslateModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
})
export class SharedComponentsModule { }
