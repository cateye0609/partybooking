import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/_models/post.model';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  @Input('data') post_list: Post[] = [];
  page: number = 1;
  total_pages: number;

  constructor(
    private postService: PostService,
  ) { }

  ngOnInit() {
    this.get_posts_list(1);
  }

  // Lấy danh sách bài viết
  get_posts_list(page: number) {
    this.postService.get_posts_list(page).subscribe(
      res => {
        this.post_list = res.data.value as Post[];
        this.total_pages = res.data.total_page;
        this.page = page;
      })
  }
}