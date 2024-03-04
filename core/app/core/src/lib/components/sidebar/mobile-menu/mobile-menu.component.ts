/**
 * SuiteCRM is a customer relationship management program developed by SalesAgility Ltd.
 * Copyright (C) 2024 SalesAgility Ltd.
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License version 3 as published by the
 * Free Software Foundation with the addition of the following permission added
 * to Section 15 as permitted in Section 7(a): FOR ANY PART OF THE COVERED WORK
 * IN WHICH THE COPYRIGHT IS OWNED BY SALESAGILITY, SALESAGILITY DISCLAIMS THE
 * WARRANTY OF NON INFRINGEMENT OF THIRD PARTY RIGHTS.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * In accordance with Section 7(b) of the GNU Affero General Public License
 * version 3, these Appropriate Legal Notices must retain the display of the
 * "Supercharged by SuiteCRM" logo. If the display of the logos is not reasonably
 * feasible for technical reasons, the Appropriate Legal Notices must display
 * the words "Supercharged by SuiteCRM".
 */

import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from 'common';
import {Router, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {SearchBarModule} from "../../search-bar/search-bar.module";
import {ImageModule} from "../../image/image.module";
import {LabelModule} from "../../label/label.module";
import {AppStateStore} from "../../../store/app-state/app-state.store";

@Component({
    selector: 'scrm-mobile-menu',
    templateUrl: './mobile-menu.component.html',
    styleUrls: [],
    standalone: true,
    imports: [CommonModule, RouterModule, SearchBarModule, ImageModule, LabelModule]
})
export class MobileMenuComponent implements OnInit {
    @Input() menuItems: MenuItem[] = [];

    mainItems: MenuItem[];

    constructor(protected router: Router, protected appStateStore: AppStateStore) {}

    ngOnInit(): void {
        this.setItems();
    }

    setItems(): void {
        this.mainItems = this.menuItems;
    }

    navigateRoute(route: string): void {
        this.router.navigate([route]).then();
        this.appStateStore.toggleSidebar();
    }

    search(searchTerm: string): void {
        this.setItems();
        if (searchTerm.length && searchTerm.trim() !== '') {
            this.mainItems = this.mainItems.filter(item => {
                return item?.link?.label.toLowerCase().includes(searchTerm.toLowerCase());
            });
        } else {
            this.setItems();
        }
    }
}