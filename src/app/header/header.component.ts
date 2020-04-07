import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  constructor(private dataStorageService: DataStorageService) {}
  collapsed = true;
  ngOnInit() {}
  onSaveData() {
    this.dataStorageService.storeData();
  }
  onFetchData() {
    this.dataStorageService.fetchData().subscribe();
  }
}
