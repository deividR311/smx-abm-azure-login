import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IconsFolderAssest } from 'src/app/core/resources/resources.enum';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {

  @Input() nameIcon: any = null;
  @Input() matIcon: any = null;
  routeFolder: string = IconsFolderAssest.routeIcons;
  constructor() { }

}
