import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/_models/post.model';
import { PostService } from 'src/app/_services/post.service';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PostDetailComponent implements OnInit {
  post: Post = new Post;
  similar_posts: Post[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let post_id = params['id'];
      this.get_post(post_id);
    })
  }
  // Lấy thông tin bài viết
  get_post(id: string) {
    this.postService.get_post(id).subscribe(
      res => {
        this.post = res.data as Post;
        this.get_similar_posts(this.post.author);
      },
      err => {
        if (err.error.message == "Không tìm thấy Id bài viết") {
          this.router.navigate(['/404']);
        }
      }
    )
  }

  // Lấy danh sách bài viết cùng tác giả
  get_similar_posts(name: string) {
    this.postService.get_posts_list_byAuthor(name).subscribe(
      res => {
        this.similar_posts = res.data as Post[];
      })
  }
}