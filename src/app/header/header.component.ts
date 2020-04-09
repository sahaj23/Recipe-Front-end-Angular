import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  isAuthenticated = false;
  collapsed = true;
  ngOnDestroy(): void {
    this.authService.user.unsubscribe();
  }
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    //this.authService.user.subscribe();
    this.authService.user.subscribe((user) => {
      this.isAuthenticated = user ? true : false;
    });
  }
  onSaveData() {
    this.dataStorageService.storeData();
  }
  onFetchData() {
    this.dataStorageService.fetchData().subscribe();
  }
  onLogout() {
    this.authService.logout();
  }
}
